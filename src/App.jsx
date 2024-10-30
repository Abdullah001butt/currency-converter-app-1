import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CurrencyConverter from "./api/PostApi";

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["convert", fromCurrency, toCurrency, amount],
    queryFn: () => CurrencyConverter(fromCurrency, toCurrency, amount),
    enabled: false, // Disable automatic refetching
    cacheTime: 1000 * 60 * 5, // Cache the result for 5 minutes
    staleTime: 1000 * 60 * 1, // Consider the data fresh for 1 minute
  });

  const handleCurrencyConverter = () => {
    if (amount > 0) {
      refetch();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Currency Converter
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                From:
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["USD", "EUR", "INR", "GBP", "AUD"].map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                To:
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["INR", "USD", "EUR", "GBP", "AUD"].map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            disabled={isLoading || amount <= 0}
            onClick={handleCurrencyConverter}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Converting..." : "Convert"}
          </button>
        </div>
        <hr className="my-6" />
        {data && (
          <h2 className="text-center text-4xl font-bold text-green-600">
            {amount} {fromCurrency} = {data.conversion_result.toFixed(2)}{" "}
            {toCurrency}
          </h2>
        )}
        {error && (
          <div className="text-red-500 text-center mt-4">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default App;
