import { useNavigate, useLocation } from 'react-router-dom';
import './Shop.css';
import { Product } from './Product';
import { AllArticles } from './AllArticles';
import { ShopLayout } from './ShopLayout';

export const productsData = [
  { id: 1, name: 'Camiseta Casablanca', price: 'XX€', image: '/Ropa/1A.jpg', description: 'Crafted from heavyweight organic cotton, this tee offers a relaxed fit and effortless drape.' },
  { id: 2, name: 'Camiseta Casablanca', price: 'XX€', image: '/Ropa/1A.jpg', description: 'Premium heavyweight french terry hoodie. Perfect for any season with a dropped shoulder design.' },
  { id: 3, name: 'Camiseta Casablanca', price: 'XX€', image: '/Ropa/1A.jpg', description: 'Technical cargo pants with articulated knees and multiple utility pockets. Water-resistant.' },
  { id: 4, name: 'Camiseta Casablanca', price: 'XX€', image: '/Ropa/1A.jpg', description: '100% merino wool beanie for superior warmth and a clean aesthetic.' },
  { id: 5, name: 'Camiseta Casablanca', price: 'XX€', image: '/Ropa/1A.jpg', description: 'Minimalist structured jacket featuring hidden hardware and a tailored fit.' },
];

export function Shop() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathStr = location.pathname.replace(/^\/?/, '');
  const parts = pathStr.split('/').map(decodeURIComponent).filter(Boolean);
  
  const isProduct = parts.length >= 3 && parts[1].toUpperCase() === 'PRODUCT';
  const productId = isProduct ? parseInt(parts[2], 10) : null;
  
  const isAllArticles = parts.length >= 2 && parts[1].toUpperCase() === 'ALL';
  const isHome = !isProduct && !isAllArticles;

  return (
    <ShopLayout>
      {/* Banner for Home */}
      {isHome && (
        <div className="shop-banner">
          <img src="/Ropa/1B.jpg" alt="Moodbreaker Collection" />
          <div className="shop-banner-overlay">
            <h2>MOODBREAKER</h2>
            <p>POP-UP STORE</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="shop-main">
        {isProduct && productId ? (
          <Product id={productId} />
        ) : isAllArticles ? (
          <AllArticles />
        ) : (
          <>
            <section className="shop-section">
              <h2 className="shop-section-title">DESTACADOS</h2>
              <div className="bento-grid">
                {productsData.slice(0, 4).map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`bento-item bento-item-${index}`}
                    onClick={() => navigate(`/SHOP/PRODUCT/${product.id}`)}
                  >
                    <div className="bento-image-wrapper">
                      <img src={product.image} alt={product.name} className="bento-image" />
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-name">{product.name}</h3>
                      <p className="bento-price">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="shop-section">
              <h2 className="shop-section-title">ÚLTIMAS UNIDADES</h2>
              <div className="horizontal-grid">
                {productsData.slice(0, 4).map((product, index) => {
                  const unitsLeft = [6, 3, 5, 1];
                  const units = unitsLeft[index];
                  const text = units === 1 ? 'SOLO QUEDA 1 UNIDAD' : `SOLO QUEDAN ${units} UNIDADES`;
                  return (
                    <div 
                      key={`last-${product.id}`} 
                      className="horizontal-item"
                      onClick={() => navigate(`/SHOP/PRODUCT/${product.id}`)}
                    >
                      <div className="horizontal-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src={product.image} alt={product.name} className="horizontal-image" />
                        <div className="units-left-banner">
                          {text}
                        </div>
                      </div>
                      <div className="horizontal-info">
                        <h3 className="bento-name">{product.name}</h3>
                        <p className="bento-price">{product.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </ShopLayout>
  );
}
