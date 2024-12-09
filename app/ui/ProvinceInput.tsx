import React, { useState } from 'react';
import Image from 'next/image';
import { provinces } from '@/app/lib/data';

type ProvinceInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const ProvinceInput: React.FC<ProvinceInputProps> = ({ }) => {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center pl-3 pointer-events-none">
        <Image
          src="/icon/location.svg"
          width={20}
          height={20}
          alt="Location icon"
        />
      </div>
      <select
        aria-label="Select province"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border px-10 py-2 w-full rounded-md"
      >
        <option value="" className='text-gray-400'>Tỉnh thành</option>
        {provinces.map((province, index) => (
          <option key={index} value={province}>
            {province}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceInput;