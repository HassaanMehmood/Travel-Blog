import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BudgetPlanner.css";

const TravelBudgetPlanner = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [transportationMode, setTransportationMode] = useState("");
  const [hotelRating, setHotelRating] = useState(1);
  const [foodType, setFoodType] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    calculateTotalCost();
    // eslint-disable-next-line
  }, [
    selectedCity,
    transportationMode,
    hotelRating,
    foodType,
    numberOfPersons,
    numberOfRooms,
    numberOfDays,
  ]);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/budgetCalculator"
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const calculateTotalCost = () => {
    const city = cities.find((c) => c.name === selectedCity);
    if (!city) {
      setTotalCost(0);
      return;
    }

    const transportation = city.transportation.find(
      (t) => t.mode === transportationMode
    );
    const accommodation = city.accommodations.find(
      (a) => a.stars === parseInt(hotelRating)
    );
    const food = city.foods.find((f) => f.type === foodType);

    if (!transportation || !accommodation || !food) {
      setTotalCost(0);
      return;
    }

    const totalTransportationCost = transportation.price * numberOfPersons;
    const totalAccommodationCost =
      accommodation.pricePerNight * numberOfRooms * numberOfDays;
    const totalFoodCost =
      food.pricePerMeal * numberOfPersons * numberOfDays * 3;

    const total =
      totalTransportationCost + totalAccommodationCost + totalFoodCost;
    setTotalCost(total);
  };

  return (
    <div className="budget-planner">
      <h2>Travel Budget Planner</h2>
      <div className="row">
        <div className="col-md-6">
          <label>City:</label>
          <select
            className="form-control"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Mode of Transportation:</label>
          <select
            className="form-control"
            value={transportationMode}
            onChange={(e) => setTransportationMode(e.target.value)}
          >
            <option value="">Select Mode</option>
            {selectedCity &&
              cities
                .find((city) => city.name === selectedCity)
                .transportation.map((transport, index) => (
                  <option key={index} value={transport.mode}>
                    {transport.mode}
                  </option>
                ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Hotel Rating:</label>
          <select
            className="form-control"
            value={hotelRating}
            onChange={(e) => setHotelRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Number of Rooms:</label>
          <input
            className="form-control"
            type="number"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
            min="1"
          />
        </div>
        <div className="col-md-6">
          <label>Food Type:</label>
          <select
            className="form-control"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          >
            <option value="">Select Food Type</option>
            {selectedCity &&
              cities
                .find((city) => city.name === selectedCity)
                .foods.map((food, index) => (
                  <option key={index} value={food.type}>
                    {food.type}
                  </option>
                ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Number of Persons:</label>
          <input
            className="form-control"
            type="number"
            value={numberOfPersons}
            onChange={(e) => setNumberOfPersons(e.target.value)}
            min="1"
          />
        </div>
        <div className="col-md-6">
          <label>Number of Days:</label>
          <input
            className="form-control"
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
            min="1"
          />
        </div>
      </div>
      <div className="estimated-cost">
        <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default TravelBudgetPlanner;
