import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, User as UserIcon, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    wishlist,
    setIsCartOpen,
    user,
    setSelectedCollection,
    setActiveTrackingOrder,
    siteSettings
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (page: string, col: string | null = null) => {
    setSelectedCollection(col);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F6]/95 backdrop-blur-md border-b border-[#EEEEEC]">
      {/* Top micro announcement bar */}
      <div className="bg-[#111111] text-[#F8F8F6] text-xs py-1.5 px-4 text-center tracking-wider flex items-center justify-between">
        <span className="hidden sm:inline-block text-neutral-400">EVERY STEP. YOUR STYLE.</span>
        <span className="mx-auto font-medium">{siteSettings?.announcementText || 'Complimentary Express Shipping Across Pakistan On Orders Over PKR 15,000'}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTrackingOrder('open-tracker')}
            className="hidden sm:inline-block text-neutral-300 hover:text-white hover:underline cursor-pointer font-medium"
          >
            Track Order
          </button>
        </div>
      </div>

      {/* Main Navigation - 3 Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => navigateTo('home')}
          className="text-2xl sm:text-3xl font-serif-luxury font-bold tracking-[0.2em] text-[#111111] hover:text-[#D8C7AE] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          19BEESKICKS
        </button>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#111111]">
          <button
            onClick={() => navigateTo('shop')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'shop' && !mobileMenuOpen ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => navigateTo('men')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'men' ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Men
          </button>
          <button
            onClick={() => navigateTo('women')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'women' ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Women
          </button>
          <button
            onClick={() => navigateTo('collections')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'collections' ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => navigateTo('story')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'story' ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className={`cursor-pointer hover:text-[#D8C7AE] transition-colors py-1 whitespace-nowrap shrink-0 ${
              currentPage === 'contact' ? 'border-b-2 border-[#111111] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action & utility zone */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-[#111111]">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 hover:text-[#D8C7AE] transition-colors cursor-pointer"
            aria-label="Search footwear"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="p-1.5 hover:text-[#D8C7AE] transition-colors relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D8C7AE] text-[#111111] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Account / Admin */}
          {user ? (
            <button
              onClick={() => navigateTo(user.role === 'admin' ? 'admin' : 'profile')}
              className="flex items-center gap-1.5 p-1.5 hover:text-[#D8C7AE] transition-colors text-xs uppercase tracking-wider font-medium cursor-pointer"
              title={user.name}
            >
              {user.role === 'admin' ? (
                <span className="flex items-center gap-1 text-[#111111] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="hidden md:inline">Admin</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => navigateTo('auth')}
              className="p-1.5 hover:text-[#D8C7AE] transition-colors cursor-pointer"
              aria-label="Sign In or Register"
            >
              <UserIcon className="w-5 h-5" />
            </button>
          )}

          {/* Shopping Bag Button (Primary Action) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#111111] text-[#FFFFFF] px-4 py-2.5 rounded-none hover:bg-[#333333] transition-colors text-xs uppercase tracking-widest font-semibold cursor-pointer shrink-0"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8C7AE]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#D8C7AE] text-[#111111] text-[11px] font-bold px-1.5 py-0.5 rounded-full ml-1">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 hover:text-[#D8C7AE] transition-colors cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-[#EEEEEC] bg-[#FFFFFF] px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by footwear style, material, color, or collection..."
              className="w-full text-sm outline-none bg-transparent py-1 text-[#111111] placeholder:text-neutral-400"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs uppercase tracking-wider font-semibold text-[#111111] hover:text-[#D8C7AE] px-3 py-1 bg-neutral-100 cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-neutral-400 hover:text-neutral-700 text-xs uppercase cursor-pointer"
            >
              Close
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F8F6] border-t border-[#EEEEEC] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-[#111111]">
            <button
              onClick={() => navigateTo('shop')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              Shop All
            </button>
            <button
              onClick={() => navigateTo('men')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              Men's Collection
            </button>
            <button
              onClick={() => navigateTo('women')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              Women's Collection
            </button>
            <button
              onClick={() => navigateTo('collections')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              All Collections
            </button>
            <button
              onClick={() => navigateTo('story')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="text-left py-2 border-b border-[#EEEEEC]"
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                setActiveTrackingOrder('open-tracker');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#D8C7AE] font-semibold"
            >
              Track Your Order
            </button>
          </div>

          <div className="pt-4 border-t border-[#EEEEEC] flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-600">Signed in as <strong>{user.name}</strong></span>
                <button
                  onClick={() => navigateTo(user.role === 'admin' ? 'admin' : 'profile')}
                  className="text-xs uppercase font-bold text-[#111111] underline cursor-pointer"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('auth')}
                className="w-full py-2.5 text-center bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
