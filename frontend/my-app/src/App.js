import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser"; 
import Welcome from "./components/Welcome"; 
import Reserves from "./components/Reserves";
import SpeciesCrud from "./components/Species";


function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/reserves" element={<Reserves />} />
          <Route path="/species" element={<SpeciesCrud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
