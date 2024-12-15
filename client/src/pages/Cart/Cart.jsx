import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);



    const nav = useNavigate();

    return (
        <div className="cart">
            <div className="cart-items">
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} className="cart-items-item">
                                <img src={url+"/images/"+item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <p className="product-name">{item.name}</p>
                                    <p className="product-price">Price: ${item.price}</p>
                                    <p className="product-quantity">Quantity: {cartItems[item._id]}</p>
                                    <p className="product-total">Total: ${item.price * cartItems[item._id]}</p>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${20}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() + 20}</b>
                        </div>
                    </div>
                    <button onClick={() => nav("/order")}>PROCEED TO CHECKOUT</button>
                </div>

                <div className="cart-promo-code">
                    <div>
                        <p>I f you have any promo code then enter</p>
                        <div className='cart-promo-code-input'>
                            <input type="text" placeholder="promo code" id="" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;
