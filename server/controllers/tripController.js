import Trip from "../models/tripModel.js";

// Create Trip
export const createTrip = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Not authenticated" });

    const { title, destination, startDate, endDate, items = [] } = req.body;

    const savedTrip = await Trip.create({
      title,
      destination,
      startDate,
      endDate,
      items,
      user: req.user.id,
    });

    res.status(201).json(savedTrip);
  } catch (err) {
    console.error("createTrip error:", err); // helpful server log
    const code = err.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ error: err.message });
  }
};

// Get a single trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized access" });

    res.status(200).json(trip);
  } catch (err) {
    console.error("getTripById error:", err);
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    const { title, destination, startDate, endDate, items } = req.body;
    if (title !== undefined) trip.title = title;
    if (destination !== undefined) trip.destination = destination;
    if (startDate !== undefined) trip.startDate = startDate;
    if (endDate !== undefined) trip.endDate = endDate;
    if (items !== undefined) trip.items = items;

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (err) {
    console.error("updateTrip error:", err);
    const code = err.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ error: err.message });
  }
};

// Get All Trips of Logged In User
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(trips);
  } catch (err) {
    console.error("getUserTrips error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    await trip.deleteOne();
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("deleteTrip error:", err);
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Items
export const addItemToTrip = async (req, res) => {
  try {
    const { id } = req.params; // tripId
    const { name, quantity = 1 } = req.body;

    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    trip.items.push({ name, quantity, packed: false });
    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    console.error("addItemToTrip error:", err);
    const code = err.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ error: err.message });
  }
};

export const removeItemFromTrip = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    trip.items = trip.items.filter((i) => i._id.toString() !== itemId);
    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    console.error("removeItemFromTrip error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const updateItemInTrip = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;
    const { name, quantity, packed } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    const item = trip.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (name !== undefined) item.name = name;
    if (quantity !== undefined) item.quantity = quantity;
    if (packed !== undefined) item.packed = packed;

    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    console.error("updateItemInTrip error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const toggleItemPackedStatus = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    if (trip.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    const item = trip.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.packed = !item.packed;
    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    console.error("toggleItemPackedStatus error:", err);
    res.status(400).json({ error: err.message });
  }
};
