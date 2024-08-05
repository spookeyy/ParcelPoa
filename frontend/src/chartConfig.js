// src/chartConfig.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, // Register category scale
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
