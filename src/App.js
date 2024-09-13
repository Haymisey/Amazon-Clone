import "./App.css";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected import for BrowserRouter
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path to your Firebase configuration
import { useStateValue } from "./components/StateProvider/StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authuser) => {
      console.log("the user is>>>>", authuser);
      if (authuser) {
        dispatch({
          type: "SET_USER",
          user: authuser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={[<Login />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/" element={[<Header />, <Home />]} />
          {/* Default route should always be at the bottom or else it's going to be a problem:) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
