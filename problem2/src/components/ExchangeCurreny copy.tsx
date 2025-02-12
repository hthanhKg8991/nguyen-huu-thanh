import React, { useState } from "react";
import { FaExchangeAlt, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/currentExchange.css"
import { Select } from "antd";
import SelectOption from "./SelectOption";

const CurrencyExchangeForm = () => {
  // Danh sách các loại tiền tệ
  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "VND", name: "Vietnamese Dong" },
  ];

  // State để lưu trữ dữ liệu nhập vào
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Tỷ giá hối đoái (giả định)
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, VND: 23000 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 130, VND: 27000 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150, VND: 31000 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, VND: 210 },
    VND: { USD: 0.000043, EUR: 0.000037, GBP: 0.000032, JPY: 0.0048 },
  };

  // Hàm xử lý khi người dùng nhấn nút "Hoán đổi"
  const handleConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      if (fromCurrency === toCurrency) {
        setConvertedAmount(amount); // Nếu cùng loại tiền tệ, không cần hoán đổi
      } else {
        const rate = exchangeRates[fromCurrency][toCurrency];
        console.log('ThanhNguyen:: fromCurrency', fromCurrency);
        console.log('ThanhNguyen:: toCurrency', toCurrency);
        console.log('ThanhNguyen:: exchangeRates[fromCurrency]', exchangeRates[fromCurrency]);
        console.log('ThanhNguyen:: rate', rate);
        setConvertedAmount(parseFloat((amount * rate).toFixed(2))); // Làm tròn đến 2 chữ số thập phân
      }
      setIsConverting(false);
    }, 1000); // Giả lập thời gian chuyển đổi
  };

  // Hàm hoán đổi hai loại tiền tệ
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <motion.div
      className="currency-exchange-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Hoán đổi tiền tệ</h2>
      <div className="form-group">
        <label>Từ:</label>
        <SelectOption/>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="currency-select"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>
      <motion.div
        className="swap-button"
        onClick={handleSwapCurrencies}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowDown className="swap-icon" />
      </motion.div>
      <div className="form-group">
        <label>Sang:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="currency-select"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Số lượng:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min="0"
          className="amount-input"
        />
      </div>
      <motion.button
        className="convert-button"
        onClick={handleConvert}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaExchangeAlt className="convert-icon" /> Hoán đổi
      </motion.button>
      <AnimatePresence>
        {convertedAmount !== null && (
          <motion.div
            className="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Kết quả:</h3>
            <p>
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {isConverting && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurrencyExchangeForm;