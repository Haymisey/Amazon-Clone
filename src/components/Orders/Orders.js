import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../../firebase";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useStateValue } from "../StateProvider/StateProvider";
import Order from "../Order/Order";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(db, "users", user?.uid, "orders");
      const q = query(userOrdersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

      // Cleanup function to unsubscribe from the listener
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div>
      <h1>Your Orders!!</h1>
      <div className="orders__order">
        {orders?.map(order=>(
          <Order order={order}/>
        ))}
      </div>
    </div>
  );
}
