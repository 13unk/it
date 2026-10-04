import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsData } from './Shop';
import './Shop.css';

export function AllArticles() {
  const navigate = useNavigate();
  // Generate 16 items by repeating productsData
  let all16 = [...productsData];
  while (all16.length < 16) {
    all16 = all16.concat(productsData);
  }
  all16 = all16.slice(0, 16);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const filters = [
    { label: 'Talla', options: ['S', 'M', 'L', 'XL'], state: selectedSize, setter: setSelectedSize },
    { label: 'Color', options: ['Blanco', 'Negro'], state: selectedColor, setter: setSelectedColor },
    { label: 'Marca', options: ['Casablanca', 'Amiri'], state: selectedBrand, setter: setSelectedBrand },
  ];

  return (
    <div className="all-articles-page">
      <div className="custom-filters">
        {filters.map((filter) => (
          <div key={filter.label} className="filter-group">
            <span className="filter-label">{filter.label}</span>
            <div className="filter-options">
              {filter.options.map(opt => {
                const isSelected = filter.state === opt;
                const isUnselected = filter.state !== '' && !isSelected;
                return (
                  <span 
                    key={opt}
                    className={`filter-option ${isSelected ? 'selected' : ''} ${isUnselected ? 'unselected' : ''}`}
                    onClick={() => filter.setter(isSelected ? '' : opt)}
                  >
                    {opt}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="all-articles-grid">
        {all16.map((product, i) => (
          <div 
            key={`all-${i}`} 
            className="bento-item all-articles-item"
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
    </div>
  );
}
