import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from "recharts";

import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({data}) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#1b0e80" : "#40a5ed"; 
    };

    const CustomTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return(
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-400">
                    <p className="text-xs font-semibold text-purple-500 mb-1">{payload[0].payload.category}</p>
                    <p className="text-l text-rose-950">
                        Amount: <span className="text=sm font-medium text-lime-950">₹ {payload[0].payload.amount} </span>
                    </p>
                </div>
            );
        }return null;
    };

  return (
    <div className="bg-white mt-6">
        <ResponsiveContainer width="100%" height={380}>
            <BarChart data={data}>
                <CartesianGrid stroke="none"/>

                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#0a0a09" }} stroke="none" />
                <YAxis tick={{ fontSize: 12, fill: "#0a0a09"}} stroke="none" />

                <Tooltip content={<CustomTooltip/>} />

                <Bar 
                dataKey="amount"
                fill="#FF8042"
                radius={[10,10,0,0]}
                activeDot={{r:8, fill: "yellow"}}
                activeStyle={{fill: "green"}} >

                    {data.map((entry, index) => (
                        <Cell key={index} fill={getBarColor(index)} />

                    ))}
                </Bar>
                </BarChart>      
                 </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
