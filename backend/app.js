//import express from "express";
//import mongoose from "mongoose";
//import router from "./routes/user-routes";
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const blogrouter = require("./routes/blog-routes");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://blog-app-frontend-xpp0.onrender.com', // Replace with your actual frontend URL
    methods: 'GET,POST,PUT,DELETE',
}));
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_URL}@cluster0.tbcarfn.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => app.listen(5000))
    .then(() => console.log("connected to database and listening to port 5000"))
    .catch((err) => console.log(err));









//Ney6kyAYqfc4YWWh

