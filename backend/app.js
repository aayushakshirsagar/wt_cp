import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import eventRouter from "./routes/event-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

//middlewares
app.use(express.json());

 
app.use("/user", userRouter);
app.use("/admin",adminRouter);
app.use("/event",eventRouter);
app.use("/booking",bookingsRouter);


mongoose.connect("mongodb+srv://aayushakshirsagar22:aayusha22@cluster0.yskwnxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => 
   app.listen(5000, () =>
      console.log("Connected to Database And server is running")
)
)
.catch((e)=>console.log(e));

//aayushakshirsagar22
//aayusha22

//MVC approach - models (schema), controller - routing , view - frontend 

