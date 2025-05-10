import React from "react";
import "./cartManagement.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/slice/cartSlice";

const CartManagement = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="cart-management-container">
      <h2>Cart</h2>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems?.map((item) => (
            <div className="cart-item" key={item?.id}>
              <img src={item?.thumbnail || item?.images[0]} alt={item?.title} />
              <div className="item-details">
                <h3>{item?.title}</h3>
                <p>Price: ${item?.price}</p>
                <p>Quantity: {item?.quantity}</p>
                <p>Total: ${item?.price * item?.quantity}</p>
                <button onClick={() => handleRemove(item?.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Grand Total: ${totalPrice?.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartManagement;
