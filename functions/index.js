/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51PzIuZ09yx4NfttgAbLTRXFLWKVan5RE4Mb0lFld79UHX9JcMVwxOUJJPrIjW3FLbnR2Ypk52ZqQ4s6ykL7fyoWD00MwvwanRU"
);

// API setup down below

// App config
const app = express();

// Middlewares
app.post("/payments/create", async (request, response) => {
  const total = Math.round(request.query.total * 100);
  console.log("Payment Request Received BOOM!! for this amount>>>", total);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    response.status(500).send("Internal Server Error");
  } finally {
    response.end();
  }
});

// Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-ed285/us-central1/api
