import { Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Events from "./components/Events/Events.js";
import Admin from "./components/Admin/Admin.js";
import Auth from "./components/Auth/Auth.js";
import Booking from "./components/Bookings/Booking.js";
import AddEvent from "./components/Events/AddEvent.js";


import AdminProfile from "./components/Profiles/Admin.js";
import UserProfile from "./components/Profiles/User.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { adminActions, userActions } from "./store";


function App() {
  const dispatch = useDispatch();
  const isAdminLoggedin = useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedin = useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedin);
  console.log("isUserLoggedIn",isUserLoggedin);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);


  return (
    <div>
      <Header/>
      <section>
        <Routes>
        <Route path = "/" element={<Homepage />} />
        <Route path = "/events" element={<Events />} />
        {!isUserLoggedin && !isAdminLoggedin && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedin && !isAdminLoggedin && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
          {isAdminLoggedin && !isUserLoggedin && (
            <>
              {" "}
              <Route path="/add" element={<AddEvent />} />
              <Route path="/user-admin" element={<AdminProfile />} />{" "}
            </>
          )}
        </Routes>
      </section>
    </div>
  );
}

export default App;
