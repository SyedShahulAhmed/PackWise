// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import TripsPage from "./pages/Trips";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import TripDetails from "./pages/TripDetails";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />
       <Route path="/trips/:tripId" element={<TripDetails />} />

        <Route
          path="/"
          element={
            <HomePage/>
          }
        />
      </Routes>
    </Router>
    
  );
}

export default App;
