"use client"

import { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const initialSalesData = [
  { name: "Jan", total: 0 },
  { name: "Fév", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Avr", total: 0 },
  { name: "Mai", total: 0 },
  { name: "Juin", total: 0 },
];

export const SalesChart = () => {
    const [salesData, setSalesData] = useState(initialSalesData);

    useEffect(() => {
        // This useEffect will run only on the client side, after hydration.
        // This avoids hydration mismatch errors with Math.random().
        const generatedData = initialSalesData.map(item => ({
            ...item,
            total: Math.floor(Math.random() * 5000) + 1000
        }));
        setSalesData(generatedData);
    }, []);


    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
