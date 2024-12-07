// src/components/ProgressTracker.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ProgressTracker = ({ analysisHistory }) => {
  return (
    <LineChart width={600} height={300} data={analysisHistory}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Line type="monotone" dataKey="score" stroke="#8884d8" />
    </LineChart>
  );
};