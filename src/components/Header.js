import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar } from "@mui/material";
import FestivalIcon from '@mui/icons-material/Festival';
import { Box } from "@mui/system";
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { getAllEvents } from '../api-helpers/api-helpers';

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store";
import { adminActions } from "../store";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Link, NavLink, useNavigate } from "react-router-dom";


const Header = () => {
    const isAdminLoggedin = useSelector((state)=>state.admin.isLoggedIn);
    const isUserLoggedin = useSelector((state)=>state.user.isLoggedIn);
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllEvents()
            .then((data) => {
                console.log(data); // Log the data to inspect its structure
                setEvents(data.events || []); // Make sure events is initialized properly
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(data);

    const handleChange = (e, val) => {
        setSelectedEvent(val);
        const event = data.find((mov) => mov.title === val);
        console.log(event);
        if (isUserLoggedin) {
          navigate(`/booking/${event._id}`);
        }
      };
    

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
            <Toolbar>
                <Box width={"20%"}>
                    <FestivalIcon />
                </Box>
                <Box width={'30%'} margin={"auto"}>
                    <Autocomplete
                        freeSolo
                        options={events.map((option) => option.title)} // Make sure events is an array before calling map
                        renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search Across Events" />}
                    />
                </Box>
                <Box display={"flex"}>
                    <Tabs textColor="inherit" indicatorColor="secondary"
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/events" label="Events" />
                        {!isAdminLoggedin && !isUserLoggedin && (
              <>
                
                           <Tab to="/auth" LinkComponent={NavLink} label="SignUp" />
                           <Tab to="/admin" LinkComponent={NavLink} label="Admin" />
              </>
            )}
             {isUserLoggedin && (
              <>
                
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => dispatch(userActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}

            {isAdminLoggedin && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/profile" label="Profile" />
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab
                  onClick={() => dispatch(adminActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
//sx is used to give customized css
//we could've used anchor tag instead of LinkComponent in Tab , but anchor tag routing is comparatively slow

