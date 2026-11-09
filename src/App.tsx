import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MenCollectionPage } from './pages/MenCollectionPage';
import { WomenCollectionPage } from './pages/WomenCollectionPage';
import { CollectionsDirectoryPage } from './pages/CollectionsDirectoryPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AuthPages } from './pages/AuthPages';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPolicyPage } from './pages/LegalPolicyPages';

const AppContent: React.FC = () => {
  const { currentPage, toast } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'men':
        return <MenCollectionPage />;
      case 'women':
        return <WomenCollectionPage />;
      case 'collections':
        return <CollectionsDirectoryPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'profile':
      case 'orders':
        return <CustomerDashboard />;
      case 'auth':
      case 'login':
      case 'signup':
        return <AuthPages />;
      case 'story':
        return <OurStoryPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'shipping':
        return <LegalPolicyPage type="shipping" />;
      case 'returns':
        return <LegalPolicyPage type="returns" />;
      case 'terms':
        return <LegalPolicyPage type="terms" />;
      case 'privacy':
        return <LegalPolicyPage type="privacy" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased selection:bg-[#D8C7AE] selection:text-[#111111]">
      <Navbar />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Floating Drawers & Modals */}
      <CartDrawer />
      <OrderTrackingModal />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#FFFFFF] px-5 py-3 border border-[#D8C7AE] shadow-2xl flex items-center gap-3 text-xs uppercase tracking-wider font-semibold animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#D8C7AE]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
