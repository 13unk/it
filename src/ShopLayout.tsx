import { useState, useEffect, useRef, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Truck } from 'lucide-react';
import { useShop } from './ShopContext';

export function ShopLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useShop();

  const [showPlusOne, setShowPlusOne] = useState(false);
  const prevCartLength = useRef(cart.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > prevCartLength.current) {
      setShowPlusOne(true);
      const t = setTimeout(() => setShowPlusOne(false), 1000);
      prevCartLength.current = cart.length;
      return () => clearTimeout(t);
    } else {
      prevCartLength.current = cart.length;
    }
  }, [cart.length]);

  return (
    <div className="shop-container">
      {/* Header */}
      <nav className={`shop-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="shop-nav-left">
          <div className="shop-logo" onClick={() => navigate('/SHOP')} style={{ cursor: 'pointer' }}>
            "MOODBREAKER"
          </div>
          <div className="shop-nav-links">
            <span onClick={() => navigate('/SHOP')}>Home</span>
            <span onClick={() => navigate('/SHOP/ALL')}>ALL ARTICLES</span>
            <span onClick={() => navigate('/SHOP')}>For Sale</span>
            <span onClick={() => navigate('/SHOP')}>Bundles</span>
          </div>
        </div>
        <div className="shop-nav-right">
          <Search size={20} style={{ cursor: 'pointer' }} />
          <Truck size={20} style={{ cursor: 'pointer' }} onClick={() => navigate('/TRACKING')} />
          <div className="shop-cart-btn" onClick={() => navigate('/CART')} style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            {showPlusOne && <span className="cart-plus-one">+1</span>}
          </div>
        </div>
      </nav>

      {/* Main Content wrapped with a key for transition */}
      <div key={location.pathname} className="shop-page-transition">
        {children}
      </div>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="shop-footer-separator"></div>
        <div className="shop-footer-links">
          <span onClick={() => navigate('/CONTACT')}>CONTÁCTANOS</span>
          <span onClick={() => navigate('/FAQ#terms')}>TÉRMINOS Y CONDICIONES</span>
          <span onClick={() => navigate('/FAQ#shipping')}>ENVÍOS</span>
          <span onClick={() => navigate('/FAQ#returns')}>DEVOLUCIONES</span>
        </div>
      </footer>
    </div>
  );
}
