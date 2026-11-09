from django.contrib import admin
from .models import Category, Collection, Product, ProductImage, ProductSize, Review, ContactMessage, NewsletterSubscriber
from orders.models import Order, OrderItem, OrderStatusHistory
from payments.models import Payment

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 2

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_count', 'in_stock', 'is_best_seller', 'is_new_arrival')
    list_filter = ('category', 'in_stock', 'is_best_seller', 'is_new_arrival')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductSizeInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'size', 'color', 'price', 'quantity')

class PaymentInline(admin.StackedInline):
    model = Payment
    extra = 0
    readonly_fields = ('method', 'account_title', 'account_number', 'transaction_id', 'created_at')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'full_name', 'phone', 'city', 'total', 'status', 'created_at')
    list_filter = ('status', 'city', 'created_at')
    search_fields = ('order_number', 'full_name', 'phone', 'email')
    inlines = [OrderItemInline, PaymentInline]

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'method', 'amount', 'transaction_id', 'status', 'created_at')
    list_filter = ('method', 'status')
    search_fields = ('transaction_id', 'order__order_number')
    actions = ['approve_payments', 'reject_payments']

    def approve_payments(self, request, queryset):
        queryset.update(status='verified')
        self.message_user(request, "Selected JazzCash payments marked as VERIFIED.")
    approve_payments.short_description = "Approve selected payments"

    def reject_payments(self, request, queryset):
        queryset.update(status='rejected')
        self.message_user(request, "Selected payments marked as REJECTED.")
    reject_payments.short_description = "Reject selected payments"

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')

admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Review)
