from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decimal import Decimal
from store.models import Category, Collection, Product, ProductSize, Review
from orders.models import Order, OrderItem, OrderStatusHistory
from payments.models import Payment

class Command(BaseCommand):
    help = 'Seeds 19BeesKicks demo products, categories, collections, and evaluation users into Django SQLite database.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Seeding 19BeesKicks demo data...'))

        # 1. Superuser / Admin & Customer Users
        if not User.objects.filter(username='admin').exists():
            admin = User.objects.create_superuser('admin', '19beeskicks@gmail.com', 'samad123')
            admin.first_name = 'Abdul'
            admin.last_name = 'Samad'
            admin.save()
            self.stdout.write(self.style.SUCCESS('Created admin user: admin / samad123 (email: 19beeskicks@gmail.com)'))
        else:
            self.stdout.write('Admin user already exists.')

        if not User.objects.filter(username='hamza').exists():
            customer = User.objects.create_user('hamza', 'hamza.khan@gmail.com', 'password123')
            customer.first_name = 'Hamza'
            customer.last_name = 'Khan'
            customer.save()
            self.stdout.write(self.style.SUCCESS('Created demo customer: hamza / password123'))

        # 2. Collections
        col_sovereign, _ = Collection.objects.get_or_create(
            slug='sovereign-collection',
            defaults={
                'title': 'Sovereign Atelier Collection',
                'description': 'Handcrafted architectural silhouettes in obsidian and travertine calfskin.'
            }
        )
        col_heritage, _ = Collection.objects.get_or_create(
            slug='heritage-collection',
            defaults={
                'title': 'Heritage & Casual Hybrids',
                'description': 'Timeless elegance meets modern athletic engineering.'
            }
        )

        # 3. Products
        demo_products = [
            {
                'name': 'The Sovereign Low Obsidian',
                'slug': 'sovereign-low-obsidian',
                'category': 'men',
                'collection': col_sovereign,
                'price': Decimal('18500.00'),
                'original_price': Decimal('22000.00'),
                'description': 'Precision handcrafted calfskin leather sneaker with dual-density cushioned sole. Sculpted in deep obsidian with an ivory architectural sole unit.',
                'is_best_seller': True,
                'is_new_arrival': False,
                'stock_count': 18,
                'rating': Decimal('4.9'),
                'review_count': 38,
                'sizes': [40, 41, 42, 43, 44, 45]
            },
            {
                'name': 'Aethel Travertine Runner',
                'slug': 'aethel-travertine-runner',
                'category': 'sneakers',
                'collection': col_sovereign,
                'price': Decimal('24500.00'),
                'original_price': Decimal('28000.00'),
                'description': 'A masterpiece of contemporary luxury street footwear. Features a sculpted multi-panel suede and nappa leather upper resting on an architectural flared travertine-toned midsole.',
                'is_best_seller': True,
                'is_new_arrival': True,
                'stock_count': 12,
                'rating': Decimal('5.0'),
                'review_count': 52,
                'sizes': [39, 40, 41, 42, 43, 44]
            },
            {
                'name': 'Eline Champagne Runner',
                'slug': 'eline-champagne-runner',
                'category': 'women',
                'collection': col_sovereign,
                'price': Decimal('19800.00'),
                'original_price': Decimal('23500.00'),
                'description': 'Designed exclusively for refined feminine luxury. Soft champagne cream tone with gold electroplated heel clip accent and featherlight running sole technology.',
                'is_best_seller': True,
                'is_new_arrival': True,
                'stock_count': 15,
                'rating': Decimal('4.9'),
                'review_count': 29,
                'sizes': [36, 37, 38, 39, 40, 41]
            },
            {
                'name': 'Monaco Caramel Hybrid',
                'slug': 'monaco-caramel-hybrid',
                'category': 'casual',
                'collection': col_heritage,
                'price': Decimal('21500.00'),
                'original_price': Decimal('25000.00'),
                'description': 'The ultimate synthesis of traditional artisanal cobbling and modern sneaker engineering. Hand-burnished rich caramel calf leather upper with casual sneaker tread.',
                'is_best_seller': False,
                'is_new_arrival': True,
                'stock_count': 9,
                'rating': Decimal('4.8'),
                'review_count': 17,
                'sizes': [40, 41, 42, 43, 44, 45]
            },
            {
                'name': 'Heritage Low Ivory Court',
                'slug': 'heritage-low-ivory-court',
                'category': 'sneakers',
                'collection': col_heritage,
                'price': Decimal('16800.00'),
                'original_price': Decimal('19500.00'),
                'description': 'Clean minimalist tennis court silhouette elevated with textured tumbled leather and subtle luxury beige accent lining.',
                'is_best_seller': False,
                'is_new_arrival': False,
                'stock_count': 22,
                'rating': Decimal('4.7'),
                'review_count': 44,
                'sizes': [39, 40, 41, 42, 43, 44]
            },
            {
                'name': 'Aura Cloud Runner Beige',
                'slug': 'aura-cloud-runner-beige',
                'category': 'women',
                'collection': col_sovereign,
                'price': Decimal('22000.00'),
                'original_price': Decimal('26000.00'),
                'description': 'Featherlight technical luxury sneaker with sculptured curves, soft beige nubuck panels, and cushioned bounce geometry engineered for high lifestyle demands.',
                'is_best_seller': True,
                'is_new_arrival': False,
                'stock_count': 14,
                'rating': Decimal('4.9'),
                'review_count': 31,
                'sizes': [37, 38, 39, 40, 41]
            },
            {
                'name': 'Verona Suede Driving Loafer',
                'slug': 'verona-suede-driving-loafer',
                'category': 'casual',
                'collection': col_heritage,
                'price': Decimal('20500.00'),
                'original_price': Decimal('24000.00'),
                'description': 'Handcrafted calf split-suede driving shoe featuring flexible pebble-rubber nubs and soft glove-leather lining.',
                'is_best_seller': False,
                'is_new_arrival': False,
                'stock_count': 3,
                'rating': Decimal('4.8'),
                'review_count': 19,
                'sizes': [40, 41, 42, 43, 44]
            },
            {
                'name': 'Milano Chelsea Boot Obsidian',
                'slug': 'milano-chelsea-boot-obsidian',
                'category': 'men',
                'collection': col_sovereign,
                'price': Decimal('27500.00'),
                'original_price': Decimal('32000.00'),
                'description': 'Full-grain Italian box calf Chelsea boot with bevelled welt and custom storm-welt rubber sole. Atelier edition currently sold out.',
                'is_best_seller': False,
                'is_new_arrival': False,
                'stock_count': 0,
                'rating': Decimal('4.9'),
                'review_count': 42,
                'sizes': [41, 42, 43, 44]
            },
            {
                'name': 'Sovereign High-Top Noir',
                'slug': 'sovereign-high-top-noir',
                'category': 'sneakers',
                'collection': col_sovereign,
                'price': Decimal('26000.00'),
                'original_price': Decimal('30000.00'),
                'description': 'Sculpted high-top luxury streetwear sneaker featuring padded collar, calfskin tonal overlays, and architectural cupsole.',
                'is_best_seller': False,
                'is_new_arrival': True,
                'stock_count': 8,
                'rating': Decimal('4.9'),
                'review_count': 15,
                'sizes': [40, 41, 42, 43, 44, 45]
            },
            {
                'name': 'Stellar Knit Runner Sand',
                'slug': 'stellar-knit-runner-sand',
                'category': 'women',
                'collection': col_sovereign,
                'price': Decimal('19200.00'),
                'original_price': Decimal('22500.00'),
                'description': 'Engineered breathable knit upper infused with silk yarn accents and plush responsive foam bed for all-day elegance.',
                'is_best_seller': False,
                'is_new_arrival': True,
                'stock_count': 11,
                'rating': Decimal('4.8'),
                'review_count': 23,
                'sizes': [36, 37, 38, 39, 40]
            }
        ]

        for p_data in demo_products:
            sizes = p_data.pop('sizes')
            product, created = Product.objects.update_or_create(
                slug=p_data['slug'],
                defaults=p_data
            )
            for s in sizes:
                ProductSize.objects.get_or_create(product=product, size_eu=s, defaults={'stock': 5})

            if created:
                self.stdout.write(self.style.SUCCESS(f"Created product: {product.name}"))
            else:
                self.stdout.write(f"Updated product: {product.name}")

        self.stdout.write(self.style.SUCCESS('19BeesKicks demo database seeded successfully!'))
