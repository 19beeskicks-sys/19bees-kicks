from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
    path('product/<slug:slug>/', views.product_detail, name='product_detail'),
    path('men/', views.men_collection, name='men_collection'),
    path('women/', views.women_collection, name='women_collection'),
    path('collections/', views.all_collections, name='all_collections'),
    path('our-story/', views.our_story, name='our_story'),
    path('contact/', views.contact, name='contact'),
    path('faq/', views.faq, name='faq'),
    path('newsletter/subscribe/', views.newsletter_subscribe, name='newsletter_subscribe'),
]
