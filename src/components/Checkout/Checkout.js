import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../StateProvider/StateProvider";
import FlipMove from 'react-flip-move';


export default function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src='https://placehold.co/1527x115?text=Ads' alt="" />
        <div>
          {user ? <h3>Hey, {user.email}</h3> : ""}
          <h2 className="checkout__title">Your shopping basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
