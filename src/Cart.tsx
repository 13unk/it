import { useShop } from './ShopContext';
import { Trash2 } from 'lucide-react';

export function Cart() {
  const { cart, removeFromCart } = useShop();

  const total = cart.reduce((acc, item) => {
    const num = parseFloat(item.price.replace('€', ''));
    return acc + num;
  }, 0);

  return (
    <main className="cart-page">
      <h1 className="cart-title">Tu Carrito</h1>
      
      {cart.length === 0 ? (
        <div className="cart-empty">
          <h2>El carrito está vacío</h2>
          <p>Añade algunos artículos de la tienda.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-meta">Talla: {item.size}</p>
                </div>
                <div className="cart-item-price">{item.price}</div>
                <button className="cart-item-remove" onClick={() => removeFromCart(index)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={20} color="#ff8800" />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">Total: {total}€</div>
            <button className="cart-checkout-btn">CHECKOUT</button>
          </div>
        </>
      )}
    </main>
  );
}
