'use client';
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('*'),
    password: Yup.string()
      .min(6, 'Password too short!')
      .max(50, 'Password too long!')
      .required('*'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      handleSignIn(values);
    },
  });

  const handleSignIn = async (values) => {
    try {
      // Send email and password to backend for validation
      const { data } = await axios.post('http://localhost:9000/signin', values);
      if (data.success) {
        // Redirect to home or dashboard upon successful login
        alert('Login successful!');
        window.location.href = '/home'; // Example: Redirect to home page
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during sign-in.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-green-500 to-red-500 min-h-screen'>
      <div className='bg-white rounded-xl p-8 w-full max-w-lg shadow-lg'>
        <div className='flex justify-center mb-6'>
          {/* NEPSE+ Logo with Larger Size */}
          <img
            src="https://www.canva.com/design/DAGZ1JnQAsE/bDQO8RZs3RY0Aa8qv-nxJQ/edit?utm_content=DAGZ1JnQAsE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"  // Direct raw URL of the image
            alt="NEPSE+ Logo"
            width={200}  // Increased logo width
            height={200} // Increased logo height
            className="transition-all duration-500 transform hover:scale-110"
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">Log In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className='text-lg font-semibold text-gray-700'>Email or Phone</label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter your email or phone"
                status={formik.errors.email ? 'error' : 'default'}
                className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black" // Added text-black class
              />
              {formik.errors.email && <div className="text-red-600 text-sm">{formik.errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label className='text-lg font-semibold text-gray-700'>Password</label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}  // Toggle between password and text
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  status={formik.errors.password ? 'error' : 'default'}
                  className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black" // Added text-black class
                />
                {/* Toggle visibility button */}
                <button 
                  type="button" 
                  onClick={() => setPasswordVisible(!passwordVisible)} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
              {formik.errors.password && <div className="text-red-600 text-sm">{formik.errors.password}</div>}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              LOG IN
            </Button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center text-gray-600">
          <Link href='/forgot-password' className='text-blue-500 hover:underline'>
            Forgot password?
          </Link>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href='/register' className='text-blue-500 hover:underline'>
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
