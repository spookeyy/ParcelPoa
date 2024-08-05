import React from "react";
import { Line } from "react-chartjs-2";
import '../../../chartConfig.js';

export default function DeliveriesChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-gray-200 w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Deliveries Over Time
      </h3>
      <div className="relative">
        <div className="chart-container" style={{ height: '400px' }}>
          <Line data={data} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
