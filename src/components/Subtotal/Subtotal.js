import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider/StateProvider";
import { getBasketTotal } from "../Reducer/reducer";
export default function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  // const getBasketTotal = () => {
  //   return basket.reduce((total, item) => {
  //     return total + item.price;
  //   },0);
  // };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket?.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix="$"
      />
      <button>Proceed to Checkout</button>
    </div>
  );
}
