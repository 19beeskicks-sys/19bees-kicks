from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.http import JsonResponse
from .models import Product, Collection, Category, Review, ContactMessage, NewsletterSubscriber

def home(request):
    best_sellers = Product.objects.filter(is_best_seller=True)[:6]
    new_arrivals = Product.objects.filter(is_new_arrival=True)[:6]
    collections = Collection.objects.all()
    context = {
        'best_sellers': best_sellers,
        'new_arrivals': new_arrivals,
        'collections': collections,
    }
    return render(request, 'home.html', context)

def shop(request):
    products = Product.objects.all()
    category = request.GET.get('category')
    search = request.GET.get('q')
    sort = request.GET.get('sort', 'latest')

    if category and category != 'all':
        products = products.filter(category=category)

    if search:
        products = products.filter(name__icontains=search)

    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    else:
        products = products.order_by('-created_at')

    context = {
        'products': products,
        'category': category or 'all',
        'search': search or '',
        'sort': sort,
    }
    return render(request, 'shop.html', context)

def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    related = Product.objects.filter(category=product.category).exclude(id=product.id)[:3]
    context = {
        'product': product,
        'related_products': related,
    }
    return render(request, 'product_detail.html', context)

def men_collection(request):
    products = Product.objects.filter(category__in=['men', 'sneakers', 'casual'])
    return render(request, 'men.html', {'products': products})

def women_collection(request):
    products = Product.objects.filter(category__in=['women', 'sneakers'])
    return render(request, 'women.html', {'products': products})

def all_collections(request):
    collections = Collection.objects.all()
    return render(request, 'collections.html', {'collections': collections})

def our_story(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone', '')
        subject = request.POST.get('subject', 'General Inquiry')
        message = request.POST.get('message')

        if name and email and message:
            ContactMessage.objects.create(
                name=name, email=email, phone=phone, subject=subject, message=message
            )
            messages.success(request, 'Thank you for reaching out. We will respond shortly.')
            return redirect('contact')
    return render(request, 'contact.html')

def faq(request):
    return render(request, 'faq.html')

def newsletter_subscribe(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email and '@' in email:
            sub, created = NewsletterSubscriber.objects.get_or_create(email=email)
            if created:
                messages.success(request, 'Thank you for subscribing to 19BeesKicks VIP updates.')
            else:
                messages.info(request, 'You are already subscribed to VIP updates.')
    return redirect('home')
