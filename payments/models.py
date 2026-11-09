from django.db import models
from orders.models import Order
from decimal import Decimal

class Payment(models.Model):
    METHOD_CHOICES = (
        ('jazzcash', 'JazzCash Manual Transfer'),
        ('easypaisa', 'Easypaisa Mobile Wallet'),
        ('bank_transfer', 'Direct Bank Transfer'),
        ('cod', 'Cash on Delivery'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending Verification'),
        ('verified', 'Verified / Paid'),
        ('rejected', 'Rejected'),
        ('refunded', 'Refunded'),
    )

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    method = models.CharField(max_length=25, choices=METHOD_CHOICES, default='jazzcash')
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    # JazzCash / Easypaisa Manual Verification Fields
    account_title = models.CharField(max_length=100, default='Abdul Samad')
    account_number = models.CharField(max_length=30, default='03238917805')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    screenshot = models.ImageField(upload_to='payment_screenshots/', blank=True, null=True)
    
    admin_notes = models.TextField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.method.upper()} for {self.order.order_number} ({self.status})"
