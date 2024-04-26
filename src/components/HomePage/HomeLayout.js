import { Box, Button, Typography } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getAllEvents } from "../api-helpers/api-helpers.js";

import EventItem from "./Events/EventItem.js";


const HomeLayout = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
      getAllEvents()
        .then((data) => setEvents(data.events))
        .catch((err) => console.log(err));
    }, []);
    console.log(events);
  return (
    <Box width={'100%'} height="100%" margin="auto" marginTop={2}>
        <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjGm4JIR-H9UrPoqbKs7ejybBIvtS4PIu-Tg&s"
          alt=""
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Events
        </Typography>
      </Box>
      <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} alignItems="center" flexWrap="wrap">
        {events && events.slice(0,4).map((event,index)=>(<EventItem id={event.id} title={event.title} posterUrl={event.posterUrl} eventDate={event.eventDate} key={index}/>))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/events"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Events
        </Button>
      </Box>

      


    </Box>
  )
}

export default HomeLayout;