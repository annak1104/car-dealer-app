import React, { useState, useEffect } from 'react';

interface VehicleFilterProps {
  onVehicleTypeChange: (type: string, makeName: string) => void;
  onModelYearChange: (year: number) => void;
}

interface VehicleMake {
  MakeName: string;
  MakeId: number;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({
  onVehicleTypeChange,
  onModelYearChange,
}) => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVehicleMakes() {
      const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
      );
      const data = await response.json();
      setVehicleMakes(data.Results);
    }

    fetchVehicleMakes();
  }, []);

  const years = Array.from(
    new Array(new Date().getFullYear() - 2014),
    (x, i) => 2015 + i
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Vehicle Make:</label>
        <select
          className="border p-2 w-64"
          value={selectedMake}
          onChange={(e) => {
            const selectedMakeId = e.target.value;
            const selectedMakeName =
              vehicleMakes.find(
                (make) => make.MakeId.toString() === selectedMakeId
              )?.MakeName || '';
            setSelectedMake(selectedMakeId);
            onVehicleTypeChange(selectedMakeId, selectedMakeName); // Pass MakeId and MakeName
          }}
        >
          <option value="">Select Make</option>
          {vehicleMakes.map(({ MakeId, MakeName }) => (
            <option key={MakeId} value={MakeId}>
              {MakeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Model Year:</label>
        <select
          className="border p-2 w-64"
          value={selectedYear || ''}
          onChange={(e) => {
            const year = Number(e.target.value);
            setSelectedYear(year);
            onModelYearChange(year);
          }}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VehicleFilter;
