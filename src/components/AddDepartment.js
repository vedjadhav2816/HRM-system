import { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/departments', {
        name,
        description,
      });
      navigate('/');
    } catch (error) {
      console.error('❌ Error adding department:', error.response?.data || error);
    }
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
          .formContainer {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2.5rem 1.5rem;
            background: linear-gradient(135deg, #f0f4ff 0%, #f9fafc 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Title */
          .title {
            font-size: 2.25rem;
            font-weight: 700;
            color: #1e293b;
            letter-spacing: -0.02em;
            margin-bottom: 2.5rem;
            text-align: center;
          }

          /* Form */
          .form {
            max-width: 600px;
            width: 100%;
            background: #ffffff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
          }

          .formGroup {
            margin-bottom: 1.75rem;
          }

          .input {
            width: 100%;
            padding: 0.875rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            color: #1e293b;
            background: #f9fafb;
            transition: all 0.3s ease;
          }

          .input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            background: #ffffff;
          }

          .input::placeholder {
            color: #94a3b8;
          }

          .submitButton {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0.875rem;
            background: #3b82f6;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          }

          .submitButton:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .formContainer {
              padding: 2rem 1rem;
            }

            .title {
              font-size: 1.875rem;
            }

            .form {
              padding: 1.5rem;
            }
          }

          @media (max-width: 768px) {
            .title {
              font-size: 1.75rem;
            }

            .form {
              max-width: 100%;
            }

            .input {
              font-size: 0.95rem;
            }

            .submitButton {
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .formContainer {
              padding: 1.5rem 0.75rem;
            }

            .title {
              font-size: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .form {
              padding: 1.25rem;
            }

            .input {
              font-size: 0.9rem;
              padding: 0.75rem;
            }

            .submitButton {
              font-size: 0.9rem;
              padding: 0.75rem;
            }
          }
        `}
      </style>
      <div className="formContainer">
        <h2 className="title">Add Department</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <input
              type="text"
              placeholder="Department Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDepartment;