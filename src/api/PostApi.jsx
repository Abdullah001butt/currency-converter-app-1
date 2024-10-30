import axios from "axios";

const api = axios.create({
  baseURL:
    "https://thingproxy.freeboard.io/fetch/https://v6.exchangerate-api.com/v6/5cf13f1763c961305bb258fc",
});

const CurrencyConverter = async (fromCurrency, toCurrency, amount) => {
  const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
  console.log(res.data);
  return res.data; // Return the entire data object
};

export default CurrencyConverter;
