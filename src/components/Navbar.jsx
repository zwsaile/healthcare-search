'use client';
import React from 'react';

export default function Navbar() {
  return (
    <div
      className='bg-gradient-to-b from-cyan-700 to-cyan-600 flex items-center p-4 shadow-xl sticky top-0 z-50'
    >
      <img
        className='w-16 h-16 mr-4' // Adjusting the size of the image to align better with the text
        src='./doctor.png'
        alt="CareFinder Logo"
      />
      <p
        className='text-3xl text-white font-sans font-semibold'
      >
        CareFinder
      </p>
    </div>
  );
}
