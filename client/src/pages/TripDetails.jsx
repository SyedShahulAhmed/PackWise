import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function TripDetails() {
  const { tripId } = useParams();
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTrip = async () => {
    try {
      const res = await axios.get(`https://pack-wise-coral.vercel.app/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items || []);
    } catch (error) {
      toast.error("Failed to fetch trip items");
      console.error("Error fetching trip:", error);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/trips/items/${tripId}`,
        { name: itemName, quantity: itemQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItemName("");
      setItemQuantity(1);
      fetchTrip();
      toast.success("Item added successfully!");
    } catch (error) {
      toast.error("Failed to add item");
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/trips/items/${tripId}/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrip();
      toast.success("Item deleted");
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    }
  };

  const handleUpdateItem = async (itemId, newName, newQty) => {
    try {
      if (!newName || !newQty) {
        toast.error("Update cancelled: name or quantity missing");
        return;
      }
      await axios.put(
        `http://localhost:5000/api/trips/items/${tripId}/update/${itemId}`,
        { name: newName, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrip();
      toast.success("Item updated");
    } catch (error) {
      toast.error("Failed to update item");
      console.error(error);
    }
  };

  const handleTogglePacked = async (itemId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/trips/items/${tripId}/${itemId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrip();
      toast.success("Item status updated");
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-black rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-8">
          Trip Packing List
        </h2>

        {/* Add Item Form */}
        <form
          onSubmit={handleAddItem}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
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
            onChange={(e) => setItemQuantity(e.target.value)}
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

            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-800 text-white font-semibold p-3 rounded-t-lg">
              <span>Item Name</span>
              <span>Quantity</span>
              <span className="text-center">Actions</span>
            </div>

            {/* Items */}
            {items.map((item, index) => (
              <div
                key={item._id}
                className={`grid grid-cols-3 items-center p-3 border-t border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                {/* Name */}
                <span
                  className={`${
                    item.packed ? "line-through text-gray-500" : "text-white"
                  }`}
                >
                  {item.name}
                </span>

                {/* Quantity */}
                <span
                  className={`text-purple-400 ${
                    item.packed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {item.quantity}
                </span>

                {/* Actions */}
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
