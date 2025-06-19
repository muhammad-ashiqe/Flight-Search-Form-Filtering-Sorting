import { addFlight, getAllFlights } from "../controllers/flightController.js";
import express from 'express'

export const flightRouter = express.Router()


flightRouter.post('/add',addFlight);

flightRouter.get('/all',getAllFlights);