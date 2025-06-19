import { Flight } from "../models/flightModel.js";

//add flight controller
export const addFlight = async (req, res) => {
  try {
    const {
      flightName,
      flightNumber,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      price,
    } = req.body;

    if (
      !flightName ||
      !flightNumber ||
      !departureCity ||
      !arrivalCity ||
      !departureDate ||
      !arrivalDate ||
      !departureTime ||
      !arrivalTime ||
      !price
    ) {
      return res.status(400).json({ message: "please fill all the fields" });
    }

    const newFlight = new Flight({
      flightName,
      flightNumber,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      price,
    });

    await newFlight.save();

    res.status(201).json({ message: "flight added success", newFlight });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};


//get all flights controller
export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});

    res.status(200).json({ message: "flight fetched success", flights });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

