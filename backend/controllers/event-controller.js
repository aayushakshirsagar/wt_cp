import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
export const addEvent = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token Not Found" });
    }
  
    let adminId;
  
    // verify token
    jwt.verify(extractedToken,'webtechcp', (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: `${err.message}` });
      } else {
        adminId = decrypted.id;
        return;
      }
    });
  
    //create new movie
    const { title, description, eventDate, eventTime, address,posterUrl, featured } =
      req.body;
    if (
      !title &&
      title.trim() === "" &&
      !description &&
      description.trim() == "" &&
      !posterUrl &&
      posterUrl.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
  
    let event;
    try {
      event = new Event({
        title,
        description,
        eventDate: new Date(eventDate),
        eventTime,
        address,
        posterUrl,
        featured,
        admin: adminId, // Populate admin field with adminId
      });
     const session = await mongoose.startSession();
     const adminUser = await Admin.findById(adminId);
     session.startTransaction();
     await event.save({ session });
     adminUser.addedEvents.push(event);
     await adminUser.save({ session });
     await session.commitTransaction();
      
    } catch (err) {
      return console.log(err);
    }
  
    if (!event) {
      return res.status(500).json({ message: "Request Failed" });
    }
  
    return res.status(201).json({ event });
  };


export const getAllEvents = async (req, res, next) => {
  let events;

  try {
    events = await Event.find();
  } catch (err) {
    return console.log(err);
  }

  if (!events) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ events });
};

export const getEventById = async (req, res, next) => {
  const id = req.params.id;
  let event;
  try {
    event = await Event.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!event) {
    return res.status(404).json({ message: "Invalid Event ID" });
  }

  return res.status(200).json({ event });
};