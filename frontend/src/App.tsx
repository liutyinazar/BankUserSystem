import React from "react";
import Users from "./Components/Users/Users";
import Banks from "./Components/Banks/Banks";
import Header from "./Components/Header/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/banks" element={<Banks />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
