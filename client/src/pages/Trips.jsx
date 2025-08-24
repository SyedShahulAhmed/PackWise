import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/api";

function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrip, setNewTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
  });
  const [editingTripId, setEditingTripId] = useState(null);

  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const res = await api.get("/api/trips");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to fetch trips");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleChange = (e) => {
    setNewTrip((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdateTrip = async (e) => {
    e.preventDefault();
    try {
      if (editingTripId) {
        await api.put(`/api/trips/${editingTripId}`, newTrip);
        toast.success("Trip updated successfully!");
        setEditingTripId(null);
      } else {
        await api.post("/api/trips", newTrip);
        toast.success("Trip added successfully!");
      }
      setNewTrip({ title: "", destination: "", startDate: "", endDate: "" });
      fetchTrips();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to add/update trip";
      toast.error(msg);
    }
  };

  const handleEdit = (trip) => {
    setNewTrip({
      title: trip.title,
      destination: trip.destination,
      startDate: trip.startDate?.split("T")[0] || "",
      endDate: trip.endDate?.split("T")[0] || "",
    });
    setEditingTripId(trip._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await api.delete(`/api/trips/${id}`);
      toast.success("Trip deleted successfully!");
      fetchTrips();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to delete trip";
      toast.error(msg);
    }
  };

  if (loading) return <p className="text-center text-purple-300">Loading trips...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8">
      <div className="max-w-3xl mx-auto p-6 bg-black text-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-400 text-center">Your Trips</h2>
        </div>

        {/* Create / Edit Trip Form */}
        <form onSubmit={handleAddOrUpdateTrip} className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Trip Title"
            value={newTrip.title}
            onChange={handleChange}
            required
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={newTrip.destination}
            onChange={handleChange}
            required
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            name="startDate"
            value={newTrip.startDate}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-lg bg-gray-900 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            name="endDate"
            value={newTrip.endDate}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-lg bg-gray-900 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
          >
            {editingTripId ? "Update Trip" : "Add Trip"}
          </button>
        </form>

        {/* Trips List */}
        {trips.length === 0 ? (
          <p className="text-gray-400">No trips found. Start adding one!</p>
        ) : (
          <ul className="space-y-4">
            {trips.map((trip) => (
              <li
                key={trip._id}
                className="flex justify-between items-center bg-gray-900 p-4 rounded-lg shadow-md"
              >
                <div>
                  <Link
                    to={`/trips/${trip._id}`}
                    className="text-lg font-semibold text-purple-400 hover:underline"
                  >
                    {trip.title}
                  </Link>
                  <p className="text-gray-400">{trip.destination}</p>
                  <small className="text-gray-500">
                    <span className="font-medium text-purple-400">Start:</span>{" "}
                    {new Date(trip.startDate).toLocaleDateString()}{" "}
                    <span className="mx-2">→</span>
                    <span className="font-medium text-purple-400">End:</span>{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </small>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(trip)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Trips;
