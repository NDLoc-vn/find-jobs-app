import React from 'react';
import { companyField } from '@/app/lib/data';
import Image from 'next/image';

interface CompanyFieldInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CompanyFieldInput: React.FC<CompanyFieldInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center pl-3 pointer-events-none">
        <Image
          src="/icon/company.svg"
          width={20}
          height={20}
          alt="company icon"
        />
      </div>
      <select
        aria-label="Lĩnh vực công ty"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-10 py-2 w-full rounded-md"
      >
        <option value="" className='text-gray-400'>Lĩnh vực</option>
        {companyField.map((field, index) => (
          <option key={index} value={field}>
            {field}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanyFieldInput;