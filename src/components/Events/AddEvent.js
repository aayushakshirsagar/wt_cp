import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { addEvent } from "../../api-helpers/api-helpers";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const AddEvent = () => {
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      posterUrl: "",
      eventDate: "",
      eventTime: "",
      address: "",
      featured: false,
    });
    // const [actors, setActors] = useState([]);
    // const [actor, setActor] = useState("");
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      addEvent({ ...inputs})
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={"50%"}
            padding={10}
            margin="auto"
            display={"flex"}
            flexDirection="column"
            boxShadow={"10px 10px 20px #ccc"}
          >
            <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
              Add New Movie
            </Typography>
            <FormLabel sx={labelProps}>Title</FormLabel>
            <TextField
              value={inputs.title}
              onChange={handleChange}
              name="title"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Poster URL</FormLabel>
            <TextField
              value={inputs.posterUrl}
              onChange={handleChange}
              name="posterUrl"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              type={"date"}
              value={inputs.eventDate}
              onChange={handleChange}
              name="eventDate"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              
              value={inputs.eventTime}
              onChange={handleChange}
              name="eventDate"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              
              value={inputs.address}
              onChange={handleChange}
              name="eventDate"
              variant="standard"
              margin="normal"
            />

              
            
            <FormLabel sx={labelProps}>Featured</FormLabel>
            <Checkbox
              name="featured"
              checked={inputs.featured}
              onClick={(e) =>
                setInputs((prevSate) => ({
                  ...prevSate,
                  featured: e.target.checked,
                }))
              }
              sx={{ mr: "auto" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "30%",
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
            >
              Add New Movie
            </Button>
          </Box>
        </form>
      </div>
    );
  };
  
  export default AddEvent;