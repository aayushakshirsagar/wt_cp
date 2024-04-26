import axios from 'axios';

export const getAllEvents = async () => {
    try {
        const res = await axios.get("/event");
        return res.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        throw error; // Re-throw the error to be handled by the calling code
    }
};

export const sendUserAuthRequest = async (data, signup) => {
    try {
        const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password,
        });
        
        // Check if response status is not in the 2xx range
        if (res.status < 200 || res.status >= 300) {
            console.log("Unexpected Error Occurred");
            return null; // or throw an error
        }
        
        // Wait for response data to be received
        const resData = await res.data;
        return resData;
    } catch (error) {
        console.log("Error:", error.message);
        return null; // or throw an error
    }
};
  export const sendAdminAuthRequest = async (data) => {
    const res = await axios
      .post("/admin/login", {
        email: data.email,
        password: data.password,
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
  
    const resData = await res.data;
    return resData;
  };
  export const getEventDetails = async (id) => {
    const res = await axios.get(`/event/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  export const newBooking = async (data) => {
    const res = await axios
      .post("/booking", {
        event: data.event,
        ticketNumber: data.ticketNumber,
        date: data.date,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 201) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios
      .get(`/user/bookings/${id}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  
  export const deleteBooking = async (id) => {
    const res = await axios
      .delete(`/booking/${id}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unepxected Error");
    }
  
    const resData = await res.data;
    return resData;
  };
  
  export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  
  export const addEvent = async (data) => {
    const res = await axios
      .post(
        "/event",
        {
          title: data.title,
          description: data.description,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          posterUrl: data.posterUrl,
          featured: data.featured,
          address: data.address,
          admin: localStorage.getItem("adminId"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => console.log(err));
  
    if (res.status !== 201) {
      return console.log("Unexpected Error Occurred");
    }
  
    const resData = await res.data;
    return resData;
  };
  
  export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios
      .get(`/admin/${adminId}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpected Error Occurred");
    }
  
    const resData = await res.data;
    return resData;
  };
  
  
