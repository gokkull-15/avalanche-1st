import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage"; // Import your form page component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<FormPage />} /> {/* Form page route */}
        {/* Fallback for undefined routes */}
      </Routes>
    </Router>
  );
};

export default App;
