import mongoose from "mongoose";

const flightSchema = mongoose.Schema(
  {
    flightName: {
      type: String,
      required: true,
      trim: true,
    },
    flightNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    departureCity: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalCity: {
      type: String,
      required: true,
      trim: true,
    },
    departureDate: {
      type: Date,
      required: true,
      trim: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalTime: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


export const Flight = mongoose.model('Flight', flightSchema);