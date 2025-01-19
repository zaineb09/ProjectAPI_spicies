import React, { useState, useEffect } from "react";
import { getAllSpecies, createSpecies, updateSpecies, deleteSpecies } from "../api";
import "./styles.css"; // Import the custom CSS

const SpeciesCrud = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const [newSpecies, setNewSpecies] = useState({ reserve_id: "", animals: "", plants: "", insects: "" });
  const [editingSpecies, setEditingSpecies] = useState(null);

  useEffect(() => {
    fetchSpecies();
  }, []);

  const fetchSpecies = async () => {
    try {
      const speciesData = await getAllSpecies();
      setSpeciesList(speciesData);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const handleCreateSpecies = async () => {
    try {
      await createSpecies(newSpecies);
      fetchSpecies();
      setNewSpecies({ reserve_id: "", animals: "", plants: "", insects: "" });
    } catch (error) {
      console.error("Error creating species:", error);
    }
  };

  const handleUpdateSpecies = async () => {
    try {
      await updateSpecies(editingSpecies.reserve_id, editingSpecies);
      fetchSpecies();
      setEditingSpecies(null);
    } catch (error) {
      console.error("Error updating species:", error);
    }
  };

  const handleDeleteSpecies = async (reserveId) => {
    try {
      await deleteSpecies(reserveId);
      fetchSpecies();
    } catch (error) {
      console.error("Error deleting species:", error);
    }
  };

  return (
    <div className="container">
      <h1>Species Management</h1>

      {/* Create or Edit Species */}
      <div className="form-section">
        <h2>{editingSpecies ? "Edit Species" : "Create New Species"}</h2>
        <input
          className="input-field"
          type="number"
          placeholder="Reserve ID"
          value={editingSpecies ? editingSpecies.reserve_id : newSpecies.reserve_id}
          onChange={(e) =>
            editingSpecies
              ? setEditingSpecies({ ...editingSpecies, reserve_id: e.target.value })
              : setNewSpecies({ ...newSpecies, reserve_id: e.target.value })
          }
          disabled={!!editingSpecies}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Animals"
          value={editingSpecies ? editingSpecies.animals : newSpecies.animals}
          onChange={(e) =>
            editingSpecies
              ? setEditingSpecies({ ...editingSpecies, animals: e.target.value })
              : setNewSpecies({ ...newSpecies, animals: e.target.value })
          }
        />
        <input
          className="input-field"
          type="text"
          placeholder="Plants"
          value={editingSpecies ? editingSpecies.plants : newSpecies.plants}
          onChange={(e) =>
            editingSpecies
              ? setEditingSpecies({ ...editingSpecies, plants: e.target.value })
              : setNewSpecies({ ...newSpecies, plants: e.target.value })
          }
        />
        <input
          className="input-field"
          type="text"
          placeholder="Insects"
          value={editingSpecies ? editingSpecies.insects : newSpecies.insects}
          onChange={(e) =>
            editingSpecies
              ? setEditingSpecies({ ...editingSpecies, insects: e.target.value })
              : setNewSpecies({ ...newSpecies, insects: e.target.value })
          }
        />
        <button className="button" onClick={editingSpecies ? handleUpdateSpecies : handleCreateSpecies}>
          {editingSpecies ? "Update Species" : "Create Species"}
        </button>
        {editingSpecies && (
          <button
            className="button cancel"
            onClick={() => setEditingSpecies(null)}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table Display for Species */}
      <table className="species-table">
        <thead>
          <tr>
            <th>Reserve ID</th>
            <th>Animals</th>
            <th>Plants</th>
            <th>Insects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {speciesList.map((species) => (
            <tr key={species.reserve_id}>
              <td>{species.reserve_id}</td>
              <td>{species.animals}</td>
              <td>{species.plants}</td>
              <td>{species.insects}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => setEditingSpecies(species)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteSpecies(species.reserve_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpeciesCrud;
