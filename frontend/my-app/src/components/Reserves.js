import React, { useEffect, useState } from "react";
import { fetchReserves, createReserve, updateReserve, deleteReserve } from "../api"; // Import all CRUD functions
import './styles.css'; // Import the custom CSS

const Reserves = () => {
  const [reserves, setReserves] = useState([]);
  const [newReserve, setNewReserve] = useState({ reserve_name: "", location: "" });
  const [editingReserve, setEditingReserve] = useState(null);

  useEffect(() => {
    const getReserves = async () => {
      try {
        const data = await fetchReserves();
        setReserves(data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    };
    getReserves();
  }, []);

  const handleCreateReserve = async (e) => {
    e.preventDefault();
    try {
      const createdReserve = await createReserve(newReserve);
      setReserves([...reserves, createdReserve]);
      setNewReserve({ reserve_name: "", location: "" });
    } catch (error) {
      console.error("Error creating reserve:", error);
    }
  };

  const handleUpdateReserve = async (e) => {
    e.preventDefault();
    try {
      const updatedReserve = await updateReserve(editingReserve.reserve_id, editingReserve);
      setReserves(
        reserves.map((reserve) =>
          reserve.reserve_id === editingReserve.reserve_id ? updatedReserve : reserve
        )
      );
      setEditingReserve(null);
    } catch (error) {
      console.error("Error updating reserve:", error);
    }
  };

  const handleDeleteReserve = async (reserveId) => {
    try {
      await deleteReserve(reserveId);
      setReserves(reserves.filter((reserve) => reserve.reserve_id !== reserveId));
    } catch (error) {
      console.error("Error deleting reserve:", error);
    }
  };

  return (
    <div className="container">
      <h1>Reserves</h1>

      {/* Reserves Table */}
      <table className="reserves-table">
        <thead>
          <tr>
            <th>Reserve ID</th>
            <th>Reserve Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reserves.map((reserve) => (
            <tr key={reserve.reserve_id}>
              <td>{reserve.reserve_id}</td>
              <td>{reserve.reserve_name}</td>
              <td>{reserve.location}</td>
              <td>
                <button onClick={() => setEditingReserve(reserve)}>Edit</button>
                <button onClick={() => handleDeleteReserve(reserve.reserve_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create or Edit Form */}
      <div className="form-section">
        <h2>{editingReserve ? "Edit Reserve" : "Create New Reserve"}</h2>
        <form onSubmit={editingReserve ? handleUpdateReserve : handleCreateReserve}>
          <input
            className="input-field"
            type="text"
            placeholder="Reserve Name"
            value={editingReserve ? editingReserve.reserve_name : newReserve.reserve_name}
            onChange={(e) =>
              editingReserve
                ? setEditingReserve({ ...editingReserve, reserve_name: e.target.value })
                : setNewReserve({ ...newReserve, reserve_name: e.target.value })
            }
          />
          <input
            className="input-field"
            type="text"
            placeholder="Location"
            value={editingReserve ? editingReserve.location : newReserve.location}
            onChange={(e) =>
              editingReserve
                ? setEditingReserve({ ...editingReserve, location: e.target.value })
                : setNewReserve({ ...newReserve, location: e.target.value })
            }
          />
          <button className="button" type="submit">
            {editingReserve ? "Update Reserve" : "Create Reserve"}
          </button>
          {editingReserve && (
            <button
              type="button"
              className="button cancel"
              onClick={() => setEditingReserve(null)}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reserves;
