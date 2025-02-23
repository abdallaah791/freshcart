import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);
      navigate('/home');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Min is 3').max(15, 'Max is 15'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z]\w{4,10}$/, 'Invalid password (e.g., Ahmed123)'),
    rePassword: Yup.string()
      .required('Re-enter password')
      .oneOf([Yup.ref('password')], "Passwords don't match"),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: register,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      {apiError && <div className="text-red-600 text-center p-2 bg-red-100 rounded-md">{apiError}</div>}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {['name', 'email', 'password', 'rePassword', 'phone'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field === 'rePassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              id={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors[field] && formik.touched[field] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
