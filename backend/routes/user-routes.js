import express from "express";
import { deleteUser, getAllUsers, getBookingsOfUser, login, signUp, updateUser } from "../controllers/user-controller.js";
const userRouter = express.Router();
userRouter.get("/",getAllUsers);//to find the user , get data from database
userRouter.post("/signup",signUp);//to trake the input from the frontend and store in the database
userRouter.put("/:id",updateUser);//to update the data , we need to pass the id as the argument to get the data and then update it
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",getBookingsOfUser);
export default userRouter;