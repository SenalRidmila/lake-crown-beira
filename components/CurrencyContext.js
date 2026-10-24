'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  LKR: { symbol: 'Rs.', rate: 1, label: 'LKR (Rs)' },
  USD: { symbol: '$', rate: 0.0033, label: 'USD ($)' }, // ~300 LKR = 1 USD
  EUR: { symbol: '€', rate: 0.0031, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0026, label: 'GBP (£)' },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('LKR');

  useEffect(() => {
    const saved = localStorage.getItem('lcb_currency');
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrency(saved);
    }
  }, []);

  const changeCurrency = (curr) => {
    if (EXCHANGE_RATES[curr]) {
      setCurrency(curr);
      localStorage.setItem('lcb_currency', curr);
    }
  };

  const formatPrice = (amountInLkr) => {
    const info = EXCHANGE_RATES[currency] || EXCHANGE_RATES.LKR;
    const converted = amountInLkr * info.rate;
    if (currency === 'LKR') {
      return `${info.symbol} ${converted.toLocaleString()}`;
    }
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, currencies: EXCHANGE_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: 'LKR',
      changeCurrency: () => {},
      formatPrice: (p) => `Rs. ${p?.toLocaleString() || 0}`,
      currencies: EXCHANGE_RATES,
    };
  }
  return context;
}
