const express = require("express");
const PaymentController = require("../../Controller/Payment/paymentController");
const {verifyToken} = require("../../miscellaneous/verifyToken");

const payment = express.Router();

payment.post("/student/pay-fees", verifyToken,PaymentController.initializePayment);
payment.get("/student/save-transaction",verifyToken, PaymentController.saveTransaction);
module.exports = payment;
