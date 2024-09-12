'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import VehicleFilter from '../components/VehicleFilter';

const HomePage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleMakeName, setVehicleMakeName] = useState('');
  const [modelYear, setModelYear] = useState<number | null>(null);

  const handleVehicleTypeChange = (type: string, makeName: string) => {
    setVehicleType(type);
    setVehicleMakeName(makeName);
  };

  const handleModelYearChange = (year: number) => {
    setModelYear(year);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Car Dealer Filter</h1>
      <VehicleFilter
        onVehicleTypeChange={handleVehicleTypeChange}
        onModelYearChange={handleModelYearChange}
      />
      <div className="text-center mt-4">
        <Link
          href={`/result/${vehicleType}/${modelYear}?makeName=${vehicleMakeName}`}
        >
          <button
            className="bg-blue-500 text-white cursor-pointer py-2 px-4 rounded disabled:bg-gray-400"
            disabled={!vehicleType || !modelYear}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
