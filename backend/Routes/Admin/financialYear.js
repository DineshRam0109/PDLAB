const express = require('express')
const app = express.Router()
const yearController=require('../../Controller/Admins/financialYearAssign');
const{headController,getHeadFields, deleteHead, updateHead} = require('../../Controller/Admins/feesHead');
const {addLedger, getLedgerFields, deleteLedger, updateLedger} = require('../../Controller/Admins/feesLedger');
const {getAccount, addAccount, deleteAccount, updateAccount }= require('../../Controller/Admins/accountDetails');
const feesAllotController = require('../../Controller/Admins/feesAllotment');
const { verifyAdmin, verifyToken } = require('../../miscellaneous/verifyToken');
app.post("/year",verifyToken,verifyAdmin,yearController);
app.post("/head", verifyToken, verifyAdmin, headController);
app.get("/head", verifyToken, verifyAdmin, getHeadFields)
app.delete("/head", verifyToken, verifyAdmin, deleteHead)
app.put('/head', verifyToken, verifyAdmin, updateHead)


app.post("/ledger", verifyToken, verifyAdmin, addLedger);
app.get("/ledger", verifyToken, verifyAdmin, getLedgerFields)
app.delete('/ledger', verifyToken, verifyAdmin, deleteLedger)
app.put('/ledger', verifyToken, verifyAdmin, updateLedger)

app.post("/account", verifyToken, verifyAdmin, addAccount);
app.get('/account', verifyToken, verifyAdmin, getAccount)
app.delete('/account', verifyToken, verifyAdmin, deleteAccount)
app.put('/account', verifyToken, verifyAdmin, updateAccount)

app.post("/feesAllot", verifyToken, verifyAdmin, feesAllotController);
module.exports=app;