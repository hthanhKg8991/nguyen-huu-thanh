import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input, Select, Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";

const currencies = ["USD", "EUR", "GBP", "JPY", "VND"];
const exchangeRates = { USD: 1, EUR: 0.85, GBP: 0.75, JPY: 110, VND: 23000 };

const CurrencySwap = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  }, [amount, fromCurrency, toCurrency]);

  return (
    <motion.div 
      className="max-w-md mx-auto p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-2xl text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Currency Swap</h2>
      
      <div className="mb-4">
        <label className="block font-medium mb-2">From</label>
        <Select
          className="w-full"
          value={fromCurrency}
          onChange={setFromCurrency}
        >
          {currencies.map((currency) => (
            <Select.Option key={currency} value={currency}>{currency}</Select.Option>
          ))}
        </Select>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <motion.button 
          whileHover={{ scale: 1.2 }} 
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white text-blue-500 rounded-full shadow-md"
          onClick={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
          }}
        >
          <SwapOutlined className="text-2xl" />
        </motion.button>
      </div>
      
      <div className="mb-4">
        <label className="block font-medium mb-2">Amount</label>
        <Input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">To</label>
        <Select
          className="w-full"
          value={toCurrency}
          onChange={setToCurrency}
        >
          {currencies.map((currency) => (
            <Select.Option key={currency} value={currency}>{currency}</Select.Option>
          ))}
        </Select>
      </div>
      
      <motion.div 
        className="text-lg font-bold text-center my-4 bg-white text-blue-500 p-3 rounded-lg shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {convertedAmount} {toCurrency}
      </motion.div>
      
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="w-full bg-white text-blue-500 py-2 rounded-lg font-bold shadow-md"
      >
        Swap Now
      </motion.button>
    </motion.div>
  );
};

export default CurrencySwap;