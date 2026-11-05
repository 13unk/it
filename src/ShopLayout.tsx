import { useState, useEffect, useLayoutEffect, useRef, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Truck } from 'lucide-react';
import { useShop } from './ShopContext';

export function ShopLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useShop();

  const totalItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const prevCartCount = useRef(totalItemCount);

  // Siempre abrir desde arriba del todo al cambiar de ruta
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItemCount > prevCartCount.current) {
      setShowPlusOne(true);
      const t = setTimeout(() => setShowPlusOne(false), 1000);
      prevCartCount.current = totalItemCount;
      return () => clearTimeout(t);
    } else {
      prevCartCount.current = totalItemCount;
    }
  }, [totalItemCount]);

  return (
    <div className="shop-container">
      {/* Header */}
      <nav className={`shop-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="shop-nav-main">
          <div className="shop-nav-left">
            <div className="shop-logo" onClick={() => navigate('/SHOP')} style={{ cursor: 'pointer' }}>
              BESTFITS
            </div>
            <div className="shop-nav-links desktop-nav-links">
              <span 
                onClick={() => navigate('/SHOP')}
                className={location.pathname === '/SHOP' || location.pathname === '/shop' ? 'active-link' : ''}
              >
                Home
              </span>
              <span 
                onClick={() => navigate('/SHOP/ALL')}
                className={location.pathname.toUpperCase().includes('/ALL') ? 'active-link' : ''}
              >
                TODOS LOS ARTÍCULOS
              </span>
            </div>
          </div>
          <div className="shop-nav-right">
            <Search size={20} style={{ cursor: 'pointer' }} />
            <Truck size={20} style={{ cursor: 'pointer' }} onClick={() => navigate('/TRACKING')} />
            <div className="shop-cart-btn" onClick={() => navigate('/CART')} style={{ position: 'relative' }}>
              <ShoppingBag size={20} />
              {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
              {showPlusOne && <span className="cart-plus-one">+1</span>}
            </div>
          </div>
        </div>
        {/* Mobile secondary links row */}
        <div className="shop-nav-links mobile-nav-links">
          <span 
            onClick={() => navigate('/SHOP')}
            className={location.pathname === '/SHOP' || location.pathname === '/shop' ? 'active-link' : ''}
          >
            Home
          </span>
          <span 
            onClick={() => navigate('/SHOP/ALL')}
            className={location.pathname.toUpperCase().includes('/ALL') ? 'active-link' : ''}
          >
            TODOS LOS ARTÍCULOS
          </span>
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
