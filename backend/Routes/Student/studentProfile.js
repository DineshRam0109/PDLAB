const express = require("express");
const app = express.Router();
const {
  studentDetails,
  studentByID,
} = require("../../Controller/Students/studentDetails");
const pendingFees = require("../../Controller/Students/pendingFees");
const transactionHistory = require("../../Controller/Students/transactionHistory");
const getToken = require("../../miscellaneous/getToken");
const {verifyToken} = require("../../miscellaneous/verifyToken");
app.get("/details",verifyToken, studentDetails);
app.get("/details/:id",verifyToken,studentByID);
app.get("/pending-fees/:id",verifyToken,pendingFees);
app.get("/transactions/:student_id", verifyToken,transactionHistory);
app.post("/login",getToken)
module.exports = app;
