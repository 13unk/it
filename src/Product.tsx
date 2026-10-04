import { useState } from 'react';
import { productsData } from './Shop';
import { useShop } from './ShopContext';

export function Product({ id }: { id: number }) {
  const product = productsData.find(p => p.id === id);
  const { addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('M');

  if (!product) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image
    });
  };

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-options">
          <div className="product-sizes">
            {['S', 'M', 'L', 'XL'].map(size => (
              <span 
                key={size} 
                onClick={() => setSelectedSize(size)}
                style={{ 
                  background: selectedSize === size ? '#111' : 'transparent',
                  color: selectedSize === size ? '#fff' : '#111',
                  borderColor: selectedSize === size ? '#111' : '#ccc'
                }}
              >
                {size}
              </span>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}
