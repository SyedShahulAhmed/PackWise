import Trip from "../models/tripModel.js";

// Create Trip
export const createTrip = async (req, res) => {
  try {
    const { title, destination, startDate, endDate, items } = req.body;
    const newTrip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      items,
      user: req.user.id,
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a single trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Optional: Check if the logged-in user owns the trip
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip || trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or trip not found" });
    }

    const { title, destination, startDate, endDate, items } = req.body;

    // Update fields
    trip.title = title || trip.title;
    trip.destination = destination || trip.destination;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.items = items || trip.items;

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Trips of Logged In User
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip || trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or trip not found" });
    }
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADD ITEM TO TRIP
export const addItemToTrip = async (req, res) => {
  const { id } = req.params; // tripId
  const { name, quantity } = req.body;

  try {
    const trip = await Trip.findById(id);
    if (!trip || trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or trip not found" });
    }

    const newItem = { name, quantity, packed: false };
    trip.items.push(newItem);
    await trip.save();

    res.status(200).json({ message: "Item added to trip", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeItemFromTrip = async (req, res) => {
  const { tripId, itemId } = req.params;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or trip not found" });
    }

    trip.items = trip.items.filter((item) => item._id.toString() !== itemId);
    await trip.save();

    res.status(200).json({ message: "Item removed from trip" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✏️ UPDATE ITEM IN TRIP
export const updateItemInTrip = async (req, res) => {
  const { tripId, itemId } = req.params; // changed from id to tripId
  const { name, quantity } = req.body;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or trip not found" });
    }

    const item = trip.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (name !== undefined) item.name = name;
    if (quantity !== undefined) item.quantity = quantity;

    await trip.save();
    res.status(200).json({ message: "Item updated", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔁 TOGGLE ITEM PACKED STATUS
// Controller
export const toggleItemPackedStatus = async (req, res) => {
  const { tripId, itemId } = req.params;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const item = trip.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.packed = !item.packed;
    await trip.save();

    res.status(200).json({ message: "Packed status toggled", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

