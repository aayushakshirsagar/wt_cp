import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventDetails, newBooking } from "../../api-helpers/api-helpers.js";


const Booking = () => {
  const [event, setEvent] = useState();
  const [inputs, setInputs] = useState({ ticketNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getEventDetails(id)
      .then((res) => setEvent(res.event))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, event: event._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
              {event && (
        
          <><Typography
                  padding={3}
                  fontFamily="fantasy"
                  variant="h4"
                  textAlign={"center"}
              >
                  Book TIckets Of Movie: {event.title}
              </Typography><Box display={"flex"} justifyContent={"center"}>
                      <Box
                          display={"flex"}
                          justifyContent={"column"}
                          flexDirection="column"
                          paddingTop={3}
                          width="50%"
                          marginRight={"auto"}
                      >
                          <img
                              width="80%"
                              height={"300px"}
                              src={event.posterUrl}
                              alt={event.title} />
                          <Box width={"80%"} marginTop={3} padding={2}>
                              <Typography paddingTop={2}>{event.description}</Typography>
                              <Typography fontWeight={"bold"} marginTop={1}>
                                  Starrer:

                              </Typography>
                              <Typography fontWeight={"bold"} marginTop={1}>
                                  Release Date: {new Date(event.eventDate).toDateString()}
                              </Typography>
                          </Box>
                      </Box>
                      <Box width={"50%"} paddingTop={3}>
                          <form onSubmit={handleSubmit}>
                              <Box
                                  padding={5}
                                  margin={"auto"}
                                  display="flex"
                                  flexDirection={"column"}
                              >
                                  <FormLabel>Seat Number</FormLabel>
                                  <TextField
                                      name="seatNumber"
                                      value={inputs.ticketNumber}
                                      onChange={handleChange}
                                      type={"number"}
                                      margin="normal"
                                      variant="standard" />
                                  <FormLabel>Booking Date</FormLabel>
                                  <TextField
                                      name="date"
                                      type={"date"}
                                      margin="normal"
                                      variant="standard"
                                      value={inputs.date}
                                      onChange={handleChange} />
                                  <Button type="submit" sx={{ mt: 3 }}>
                                      Book Now
                                  </Button>
                              </Box>
                          </form>
                      </Box>
                  </Box></>
        
      )}

    </div>
  );
};

export default Booking;