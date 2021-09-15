const express= require('express');
const app= express();
app.use(express.json());
const userRouter= require("./route/userRouter")

app.use("/", userRouter);


//app listening
app.listen(process.env.PORT,()=> {
    console.log("server started on 8000");
});