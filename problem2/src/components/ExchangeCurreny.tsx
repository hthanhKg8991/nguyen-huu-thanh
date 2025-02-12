import React, { use, useEffect, useState } from "react";
import { FaExchangeAlt, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/currentExchange.css"
import { Flex, Input, Select, Image, Popover } from "antd";
import SelectOption from "./SelectOption";
import generalApiInstance from "../api/generalAPI";
import GeneralAPI from "../api/generalAPI";

const countries = [
    { code: "vn", value: "vn", label: "Vietnam" },
    { code: "us", value: "us", label: "United States" },
    { code: "jp", value: "jp", label: "Japan" },
    { code: "kr", value: "kr", label: "Korea" },
    { code: "fr", value: "fr", label: "France" },
    { code: "de", value: "de", label: "Germany" },
];

const CurrencyExchangeForm = () => {
    const [currencyList, setCurrencyList] = useState({});
    const [open, setOpen] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState({ code: "vn", name: "Vietnam", value:"vn" });


    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const handleSelectCountry = (countryCode: any) => {
        const country = countries.find((c) => c.code === countryCode);
        if (country) {
            setSelectedCountry({ code: country.code, name: country.label, value: country.value });
        }
        setOpen(false);
      };

    useEffect(() => {
        const fetchData = async () => {
            const data = await GeneralAPI.getCurrencyList();
            setCurrencyList(data);
        };
        fetchData();
    }, []);
    const selectAfter = (
        <div>

            <Popover
                content={<SelectOption 
                    dataSource={countries} 
                    onSelect={handleSelectCountry}
                    open={open}
                    setOpen={setOpen}
                    />
                }
                title=""
                trigger="click"
                open={open}
                onOpenChange={setOpen}
            >
                <Flex align="center" justify="center" style={{ cursor: "pointer", padding: "5px" }}>
                    <Image
                        src={`https://img.geonames.org/flags/x/${selectedCountry.code}.gif`}
                        height={30}
                        width={30}
                        preview={false}
                    />
                    <h5 style={{ marginLeft: 10 }}>{selectedCountry.name}</h5>
                </Flex>
            </Popover>
        </div>
    );
    console.log('ThanhNguyen:: currencyList', currencyList);
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
                <SelectOption />
                <Input addonAfter={selectAfter} defaultValue="mysite" />

            </div>
            <motion.div
                className="swap-button"
                // onClick={handleSwapCurrencies}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaArrowDown className="swap-icon" />
            </motion.div>
            <div className="form-group">
                <label>Sang:</label>
                {/* <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="currency-select"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select> */}
            </div>
            <div className="form-group">
                <label>Số lượng:</label>
                {/* <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min="0"
          className="amount-input"
        /> */}
            </div>
            <motion.button
                className="convert-button"
                // onClick={handleConvert}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FaExchangeAlt className="convert-icon" /> Hoán đổi
            </motion.button>
            {/* <AnimatePresence>
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
      </AnimatePresence> */}
            {/* {isConverting && (
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
      )} */}
        </motion.div>
    );
};

export default CurrencyExchangeForm;