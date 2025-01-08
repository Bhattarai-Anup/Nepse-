'use client';
import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const userSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Full name is required'),
    password: Yup.string()
      .min(6, 'Password too short!')
      .max(50, 'Password too long!')
      .required('Password is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must contain only digits')
      .min(10, 'Invalid phone number')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      gender: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      handleRegister(values);
    },
  });

  const handleRegister = async (values) => {
    try {
      const { data } = await axios.post('http://localhost:9000/register', values);
      alert(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-green-500 to-red-500 min-h-screen px-4'>
      <div className='bg-white rounded-xl p-8 w-full max-w-md sm:max-w-2xl md:max-w-4xl shadow-xl'>
        <div className='flex justify-center mb-6'>
          <img 
            src="https://raw.githubusercontent.com/Bhattarai-Anup/Nepseplus/main/Where%20Data%20Meets%20Profits!%20(1).png" 
            alt="NEPSE+ Logo" 
            className="transition-all duration-500 transform hover:scale-110 border-0 outline-0 w-72 h-auto" 
          />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 tracking-wide uppercase transform transition duration-300 hover:text-blue-500">
  Create Your Account
</h1>


        {/* Registration Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className='text-lg font-semibold text-gray-700'>Full Name</label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                placeholder="Enter your full name"
                status={formik.errors.fullName ? 'error' : 'default'}
                className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
              />
              {formik.errors.fullName && <div className="text-red-600 text-sm">{formik.errors.fullName}</div>}
            </div>

            {/* Phone Number */}
            <div>
              <label className='text-lg font-semibold text-gray-700'>Phone Number</label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="Enter your phone number"
                status={formik.errors.phoneNumber ? 'error' : 'default'}
                className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
              />
              {formik.errors.phoneNumber && <div className="text-red-600 text-sm">{formik.errors.phoneNumber}</div>}
            </div>

            {/* Email */}
            <div>
              <label className='text-lg font-semibold text-gray-700'>Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter your email"
                status={formik.errors.email ? 'error' : 'default'}
                className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
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
                  type={passwordVisible ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  status={formik.errors.password ? 'error' : 'default'}
                  className="rounded-xl shadow-lg border-2 p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-black"
                />
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

            {/* Gender */}
            <div>
              <label className='text-lg font-semibold text-gray-700' htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                className="mt-1 block w-full py-3 px-4 border-2 border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-gradient-to-r from-blue-100 to-pink-100 hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-300 text-black"
                aria-label="Select Gender"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.errors.gender && <div className="text-red-600 text-sm">{formik.errors.gender}</div>}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              REGISTER
            </Button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link href='/login' className='text-blue-500 hover:underline'>
            Sign In
          </Link> 
        </div>
      </div>
    </div>
  );
};

export default Register;