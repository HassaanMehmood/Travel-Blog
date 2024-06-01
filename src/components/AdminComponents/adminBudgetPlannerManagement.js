import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminBudgetPlannerManagement.css";

const BudgetPlannerManagement = () => {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [transportation, setTransportation] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [foods, setFoods] = useState([]);
  const [cities, setCities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCityId, setEditCityId] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

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

  const handleAddCity = async () => {
    try {
      await axios.post("http://localhost:3000/api/budgetCalculator", {
        name: cityName,
        country,
        transportation,
        accommodations,
        foods,
      });
      alert("City added successfully");
      resetForm();
      fetchCities();
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  const handleSaveCity = async () => {
    if (isEditing) {
      try {
        await axios.put(
          `http://localhost:3000/api/budgetCalculator/${editCityId}`,
          {
            name: cityName,
            country,
            transportation,
            accommodations,
            foods,
          }
        );
        alert("City updated successfully");
        setIsEditing(false);
        setEditCityId(null);
      } catch (error) {
        console.error("Error updating city:", error);
      }
    } else {
      handleAddCity();
    }
    fetchCities();
  };

  const handleDeleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/budgetCalculator/${id}`);
      alert("City deleted successfully");
      fetchCities();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const handleEditCity = (city) => {
    setIsEditing(true);
    setEditCityId(city._id);
    setCityName(city.name);
    setCountry(city.country);
    setTransportation(city.transportation);
    setAccommodations(city.accommodations);
    setFoods(city.foods);
  };

  const resetForm = () => {
    setCityName("");
    setCountry("");
    setTransportation([]);
    setAccommodations([]);
    setFoods([]);
  };

  const addTransportation = () => {
    setTransportation([...transportation, { mode: "", price: 0 }]);
  };

  const addAccommodation = () => {
    setAccommodations([...accommodations, { stars: 0, pricePerNight: 0 }]);
  };

  const addFood = () => {
    setFoods([...foods, { type: "", pricePerMeal: 0 }]);
  };

  return (
    <div className="budget-planner-container">
      <h2>{isEditing ? "Edit City Details" : "Add City Details"}</h2>
      <label>Country:</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="form-control"
      />
      <label>City Name:</label>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className="form-control"
      />
      <hr />
      <div className="card mb-3">
        <div className="card-header">
          <h3>Transportation</h3>
        </div>
        <div className="card-body">
          {transportation.map((trans, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                value={trans.mode}
                onChange={(e) =>
                  setTransportation((prevState) =>
                    prevState.map((item, i) =>
                      i === index ? { ...item, mode: e.target.value } : item
                    )
                  )
                }
                placeholder="Mode"
                className="form-control"
              />
              <input
                type="number"
                value={trans.price}
                onChange={(e) =>
                  setTransportation((prevState) =>
                    prevState.map((item, i) =>
                      i === index ? { ...item, price: e.target.value } : item
                    )
                  )
                }
                placeholder="Price"
                className="form-control"
              />
            </div>
          ))}
          <button className="btn btn-primary" onClick={addTransportation}>
            Add Transportation
          </button>
        </div>
      </div>
      <hr />
      <div className="card mb-3">
        <div className="card-header">
          <h3>Accommodations</h3>
        </div>
        <div className="card-body">
          {accommodations.map((acc, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="number"
                value={acc.stars}
                onChange={(e) =>
                  setAccommodations((prevState) =>
                    prevState.map((item, i) =>
                      i === index ? { ...item, stars: e.target.value } : item
                    )
                  )
                }
                placeholder="Stars"
                min="1"
                max="5"
                className="form-control"
              />
              <input
                type="number"
                value={acc.pricePerNight}
                onChange={(e) =>
                  setAccommodations((prevState) =>
                    prevState.map((item, i) =>
                      i === index
                        ? { ...item, pricePerNight: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="Price Per Night"
                className="form-control"
              />
            </div>
          ))}
          <button className="btn btn-primary" onClick={addAccommodation}>
            Add Accommodation
          </button>
        </div>
      </div>
      <hr />
      <div className="card mb-3">
        <div className="card-header">
          <h3>Foods</h3>
        </div>
        <div className="card-body">
          {foods.map((food, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                value={food.type}
                onChange={(e) =>
                  setFoods((prevState) =>
                    prevState.map((item, i) =>
                      i === index ? { ...item, type: e.target.value } : item
                    )
                  )
                }
                placeholder="Type"
                className="form-control"
              />
              <input
                type="number"
                value={food.pricePerMeal}
                onChange={(e) =>
                  setFoods((prevState) =>
                    prevState.map((item, i) =>
                      i === index
                        ? { ...item, pricePerMeal: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="Price Per Meal"
                className="form-control"
              />
            </div>
          ))}
          <button className="btn btn-primary" onClick={addFood}>
            Add Food
          </button>
        </div>
      </div>
      <hr />
      <button className="btn btn-success" onClick={handleSaveCity}>
        {isEditing ? "Update City" : "Add City"}
      </button>
      <hr />
      <h3>Existing Cities</h3>
      <div className="card">
        <ul className="list-group list-group-flush">
          {cities.map((city) => (
            <li
              key={city._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {city.name}, {city.country}
              </span>
              <div className="city-buttons">
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEditCity(city)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCity(city._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetPlannerManagement;
