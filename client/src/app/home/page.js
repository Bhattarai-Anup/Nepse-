// pages/home.js
'use client';
import React from 'react';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to NEPSE+ 📈</h1>
        <p className="text-lg md:text-2xl mb-6">Your one-stop platform for stock analysis, insights, and news</p>
        <div className="space-x-4">
          <Link href="/stocks">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-6 py-2 font-semibold shadow-md transition-all">Explore Stocks</Button>
          </Link>
          <Link href="/about">
            <Button className="bg-transparent border border-white text-white hover:bg-indigo-700 rounded-xl px-6 py-2 font-semibold shadow-md transition-all">Learn More</Button>
          </Link>
        </div>
      </header>

      {/* Featured Stocks Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📊 Featured Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/** Add featured stock cards here */}
          {['Stock A', 'Stock B', 'Stock C'].map((stock, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{stock}</h3>
              <p className="text-gray-600">Today's Price: NPR {Math.floor(Math.random() * 1000 + 100)}.00</p>
              <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md">View Details</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📰 Latest News</h2>
        <div className="space-y-4">
          {/** Replace with dynamic news data */}
          {["Market hits new high!", "Top stocks to watch", "Experts predict bullish trends"].map((news, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl shadow-lg p-4 hover:shadow-xl transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{news}</h3>
              <p className="text-gray-600">Read more about the latest happenings in the stock market.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">© {new Date().getFullYear()} NEPSE+ | All Rights Reserved</p>
        <p className="text-sm">Powered by passion and React ❤️</p>
      </footer>
    </div>
  );
};

export default Home;
