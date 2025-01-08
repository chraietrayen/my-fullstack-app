import { reportWebVitals } from 'web-vitals';

// Optional: Define a function to log the metrics if needed
const logVitals = (metric) => {
  console.log(metric);
};

// Call reportWebVitals and pass the log function
reportWebVitals(logVitals);

