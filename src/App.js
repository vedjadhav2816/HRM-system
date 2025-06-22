import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DepartmentDashboard from './components/DepartmentDashboard';
import AddDepartment from './components/AddDepartment';
import EditDepartment from './components/EditDepartment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DepartmentDashboard />} />
        <Route path="/add" element={<AddDepartment />} />
        <Route path="/edit/:id" element={<EditDepartment />} />
      </Routes>
    </Router>
  );
}

export default App;
