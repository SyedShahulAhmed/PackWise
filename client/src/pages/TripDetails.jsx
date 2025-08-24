import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";

function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  const fetchTrip = async () => {
    try {
      const res = await api.get(`/api/trips/${tripId}`);
      setTrip(res.data);
      setItems(res.data.items || []);
    } catch (error) {
      console.error("Error fetching trip:", error);
      const msg = error.response?.data?.message || "Failed to fetch trip";
      toast.error(msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // optional: redirect to login if you have access to navigate here
      toast.error("Please log in");
      return;
    }
    fetchTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/trips/items/${tripId}`, {
        name: itemName.trim(),
        quantity: Number(itemQuantity) || 1,
      });
      setItemName("");
      setItemQuantity(1);
      await fetchTrip();
      toast.success("Item added successfully!");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to add item";
      toast.error(msg);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.delete(`/api/trips/items/${tripId}/${itemId}`);
      await fetchTrip();
      toast.success("Item deleted");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to delete item";
      toast.error(msg);
    }
  };

  const handleUpdateItem = async (itemId, newName, newQty) => {
    const name = (newName ?? "").trim();
    const qtyNum = Number(newQty);
    if (!name || !qtyNum) {
      toast.error("Update cancelled: name or quantity missing");
      return;
    }
    try {
      await api.put(`/api/trips/items/${tripId}/update/${itemId}`, {
        name,
        quantity: qtyNum,
      });
      await fetchTrip();
      toast.success("Item updated");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to update item";
      toast.error(msg);
    }
  };

  const handleTogglePacked = async (itemId) => {
    try {
      await api.patch(`/api/trips/items/${tripId}/${itemId}/toggle`, {});
      await fetchTrip();
      toast.success("Item status updated");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to update status";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-black rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">
          Trip Packing List
        </h2>
        {trip && (
          <p className="text-gray-400 mb-8">
            {trip.title} — {trip.destination}
          </p>
        )}

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item name"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Math.max(1, parseInt(e.target.value || "1", 10)))}
            min="1"
            className="w-24 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Add Item
          </button>
        </form>

        {/* Items List */}
        {items.length > 0 ? (
          <div className="bg-black p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Items</h2>

            {/* Header */}
            <div className="grid grid-cols-4 bg-gray-800 text-white font-semibold p-3 rounded-t-lg">
              <span>Item Name</span>
              <span>Quantity</span>
              <span>Status</span>
              <span className="text-center">Actions</span>
            </div>

            {/* Rows */}
            {items.map((item, index) => (
              <div
                key={item._id}
                className={`grid grid-cols-4 items-center p-3 border-t border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <span className={item.packed ? "line-through text-gray-500" : "text-white"}>
                  {item.name}
                </span>
                <span className={item.packed ? "line-through text-gray-500" : "text-purple-400"}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleTogglePacked(item._id)}
                  className={`px-2 py-1 rounded ${
                    item.packed ? "bg-green-700" : "bg-gray-700"
                  }`}
                  title="Toggle packed"
                >
                  {item.packed ? "Packed" : "Not packed"}
                </button>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateItem(
                        item._id,
                        prompt("New name:", item.name),
                        prompt("New quantity:", item.quantity)
                      )
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-4">No items yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
}

export default TripDetails;
