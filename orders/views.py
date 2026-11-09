from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from store.models import Product
from .models import Order, OrderItem, OrderStatusHistory
from payments.models import Payment
from decimal import Decimal
import random

def cart_view(request):
    cart = request.session.get('cart', {})
    cart_items = []
    subtotal = Decimal('0.00')

    for key, item in cart.items():
        total_price = Decimal(str(item['price'])) * item['quantity']
        subtotal += total_price
        cart_items.append({
            'key': key,
            'product_id': item['product_id'],
            'name': item['name'],
            'price': Decimal(str(item['price'])),
            'size': item['size'],
            'color': item['color'],
            'quantity': item['quantity'],
            'total_price': total_price,
            'image': item.get('image', ''),
        })

    shipping = Decimal('0.00') if subtotal >= Decimal('15000.00') else (Decimal('250.00') if cart_items else Decimal('0.00'))
    total = subtotal + shipping

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'shipping': shipping,
        'total': total,
    }
    return render(request, 'cart.html', context)

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    size = int(request.POST.get('size', 42))
    color = request.POST.get('color', 'Standard')
    quantity = int(request.POST.get('quantity', 1))

    cart = request.session.get('cart', {})
    cart_key = f"{product.id}_{size}_{color}"

    if cart_key in cart:
        cart[cart_key]['quantity'] += quantity
    else:
        cart[cart_key] = {
            'product_id': product.id,
            'name': product.name,
            'price': str(product.price),
            'size': size,
            'color': color,
            'quantity': quantity,
            'image': '',
        }

    request.session['cart'] = cart
    messages.success(request, f'Added {product.name} (EU {size}) to bag.')
    return redirect('cart_view')

def remove_from_cart(request, cart_key):
    cart = request.session.get('cart', {})
    if cart_key in cart:
        del cart[cart_key]
        request.session['cart'] = cart
        messages.info(request, 'Item removed from bag.')
    return redirect('cart_view')

def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        messages.warning(request, 'Your bag is empty.')
        return redirect('shop')

    subtotal = Decimal('0.00')
    cart_items = []
    for key, item in cart.items():
        total_price = Decimal(str(item['price'])) * item['quantity']
        subtotal += total_price
        cart_items.append(item)

    shipping = Decimal('0.00') if subtotal >= Decimal('15000.00') else Decimal('250.00')
    grand_total = subtotal + shipping

    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        phone = request.POST.get('phone')
        email = request.POST.get('email', '')
        address = request.POST.get('address')
        city = request.POST.get('city')
        postal_code = request.POST.get('postal_code', '')
        payment_method = request.POST.get('payment_method', 'jazzcash')
        transaction_id = request.POST.get('transaction_id', '')

        if full_name and phone and address and city:
            order_number = f"19BK-2026-{random.randint(1000, 9999)}"
            order = Order.objects.create(
                order_number=order_number,
                full_name=full_name,
                email=email,
                phone=phone,
                address=address,
                city=city,
                postal_code=postal_code,
                subtotal=subtotal,
                shipping=shipping,
                total=grand_total,
                status='Pending'
            )

            for key, item in cart.items():
                OrderItem.objects.create(
                    order=order,
                    product_id=item['product_id'],
                    product_name=item['name'],
                    size=item['size'],
                    color=item['color'],
                    price=Decimal(str(item['price'])),
                    quantity=item['quantity']
                )

            Payment.objects.create(
                order=order,
                method=payment_method,
                amount=grand_total,
                status='pending',
                account_title='Abdul Samad',
                account_number='03238917805',
                transaction_id=transaction_id if payment_method == 'jazzcash' else None,
                admin_notes='Awaiting manual verification' if payment_method == 'jazzcash' else 'Cash upon delivery'
            )

            OrderStatusHistory.objects.create(
                order=order,
                status='Pending',
                note=f'Order placed via {payment_method.upper()}'
            )

            request.session['cart'] = {}
            return redirect('order_success', order_number=order.order_number)

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'shipping': shipping,
        'total': grand_total,
    }
    return render(request, 'checkout.html', context)

def order_success(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)
    return render(request, 'order_success.html', {'order': order})

def track_order(request):
    order_number = request.GET.get('order_number')
    order = None
    if order_number:
        try:
            order = Order.objects.get(order_number__iexact=order_number.strip())
        except Order.DoesNotExist:
            messages.error(request, f'No active order found for reference "{order_number}".')
    return render(request, 'track_order.html', {'order': order, 'searched_number': order_number})
