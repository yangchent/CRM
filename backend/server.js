const express= require('express');
const app= express();
app.use(express.json());
const userRouter= require("./route/userRouter");
const contactRouter= require("./route/contactRouter");
const port= process.env.PORT || 8000
const dotenv = require("dotenv");

dotenv.config({
    path: "./config.env",
});
const mongoose= require("mongoose");
const cookieParser = require("cookie-parser");


//connect to mongoose
mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected to MongoDB !");
	});

//middleware 
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/contact",contactRouter);

//app listening
app.listen(port,()=> {
    console.log(`server started on ${PORT}`);
});