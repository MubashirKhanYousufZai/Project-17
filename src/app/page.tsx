"use client";
import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useState<string>(""); // String for input
  const [height, setHeight] = useState<string>(""); // String for input
  const [bmi, setBmi] = useState<number | null>(null); // Number for BMI
  const [error, setError] = useState<string | null>(null); // Error message

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission reload
    setError(null);

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weight || !height || isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0) {
      setError("Please enter valid positive numbers for weight and height.");
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(parseFloat(bmiValue.toFixed(2))); // Set BMI with 2 decimal places
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obesity";
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-blue-500 text-4xl font-bold mb-6">BMI Calculator By Mubashir Khan</h1>

      <form
        onSubmit={calculateBMI}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Weight (kg):</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Height (m):</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-blue-600"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Calculate BMI
        </button>
      </form>

      {bmi !== null && (
        <div className="mt-6 text-center">
          <h2 className="text-green-500 text-2xl font-semibold">
            Your BMI: {bmi}
          </h2>
          <p className="text-gray-700 text-lg">
            Category: {getBMICategory(bmi)}
          </p>
        </div>
      )}
    </div>
  );
}
