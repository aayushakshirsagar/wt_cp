import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CradLayout";

const AllEvents = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center">
        All Movies
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {events &&
          events.map((event, index) => (
            <CradLayout
              id={event._id}
              title={event.title}
              eventDate={event.eventDate}
              posterUrl={event.posterUrl}
              description={event.description}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllEvents;