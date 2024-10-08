import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider/StateProvider";
export default function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
}) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove the item from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}
