import React from 'react'

const InfoCard = ({ icon, label, value, color}) => {
  return (
    <div className="flex gap-6 bg-neutral-50 p-6 rounded-2xl shadow-md shadow-gray-800 border border-gray-300">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
        </div>
    <div>
    <h6 className="text-lg text-gray-900 mb-1 font-semibold">{label}</h6>
    <span className="text=[22px]">₹{value}</span>
    </div>
    </div>
  );
};

export default InfoCard;
