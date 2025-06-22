import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DepartmentDashboard() {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const res = await axios.get('http://localhost:5000/departments');
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/departments/${id}`);
    fetchDepartments();
  };

  return (
    <>
      <style>
        {`
          /* General Reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }

          /* Container */
          .dashboardContainer {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2.5rem 1.5rem;
            background: linear-gradient(135deg, #f0f4ff 0%, #f9fafc 100%);
            min-height: 100vh;
          }

          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2.5rem;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .title {
            font-size: 2.25rem;
            font-weight: 700;
            color: #1e293b;
            letter-spacing: -0.02em;
          }

          .addButton {
            display: inline-flex;
            align-items: center;
            padding: 0.875rem 1.75rem;
            background: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          }

          .addButton:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
          }

          /* Table */
          .tableContainer {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            overflow-x: auto;
          }

          .table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }

          .table th,
          .table td {
            padding: 1.25rem;
            text-align: left;
            font-size: 0.95rem;
            color: #1e293b;
          }

          .table th {
            background: #f1f5f9;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            color: #475569;
            letter-spacing: 0.05em;
          }

          .table td {
            border-top: 1px solid #e5e7eb;
          }

          .table tr {
            transition: background 0.2s ease;
          }

          .table tr:hover {
            background: #f9fafb;
          }

          /* Actions */
          .actionCell {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .editLink {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .editLink:hover {
            color: #2563eb;
            text-decoration: underline;
          }

          .deleteButton {
            padding: 0.5rem 1.25rem;
            background: #ef4444;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(239, 68, 68, 0.15);
          }

          .deleteButton:hover {
            background: #dc2626;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(239, 68, 68, 0.25);
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .dashboardContainer {
              padding: 2rem 1rem;
            }

            .title {
              font-size: 1.875rem;
            }

            .table th,
            .table td {
              padding: 1rem;
            }
          }

          @media (max-width: 768px) {
            .header {
              flex-direction: column;
              align-items: flex-start;
            }

            .addButton {
              width: 100%;
              justify-content: center;
            }

            .table {
              font-size: 0.9rem;
            }

            .table th,
            .table td {
              padding: 0.75rem;
            }

            .actionCell {
              flex-direction: column;
              gap: 0.5rem;
            }

            .deleteButton {
              width: 100%;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .title {
              font-size: 1.5rem;
            }

            .table th,
            .table td {
              font-size: 0.85rem;
              padding: 0.5rem;
            }

            .tableContainer {
              margin: 0 -0.5rem;
            }
          }
        `}
      </style>
      <div className="dashboardContainer">
        <div className="header">
          <h2 className="title">Department Dashboard</h2>
          <Link to="/add" className="addButton">
            Add Department
          </Link>
        </div>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={dept.id}>
                  <td>{index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.description}</td>
                  <td className="actionCell">
                    <Link to={`/edit/${dept.id}`} className="editLink">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DepartmentDashboard;