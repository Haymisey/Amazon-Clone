import React, { useEffect, useState } from "react";
import "./Payment.css";
import { collection, addDoc } from "firebase/firestore";
import { useStateValue } from "../StateProvider/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../Reducer/reducer";
import axios from "../../axios";
import { db } from "../../firebase";

export default function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          // stripe expects the total in a currencies submits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("error fetching secret>>", error);
      }
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    // do all the fancy stripe stuff
    e.preventDefault();
    setProcessing(true);

    if (!clientSecret) {
      console.error("Client secret is not set");
      setProcessing(false);
      return;
    }

    console.log("User:", user);
    console.log("User ID:", user?.uid);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentInatent == payment confirmation

        addDoc(collection(db, "users", user?.uid, "orders"), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/orders");
      });
  };

  const handleChange = (e) => {
    //   listen for changes in the cardelement
    //   and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="checkout__items">
        <Link to={"/checkout"}>
          <p>Checkout({basket?.length} items)</p>
        </Link>
      </div>
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
        <hr />
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__product">
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
        <hr />
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceConainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>
                        Order Total:
                        {value}
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="$"
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
