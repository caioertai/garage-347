// Importing files
import { fetchAndDisplayCars, handleCarsForm } from "./garage.js";

// Assigning Behaviors
const carsForm = document.querySelector(".car-form");
carsForm.addEventListener("submit", handleCarsForm)

// Ajax Calls
fetchAndDisplayCars();
