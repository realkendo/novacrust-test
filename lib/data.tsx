import { Landmark } from "lucide-react";
import React from 'react';

// Define types for our data structures
export type Tab = {
  id: "crypto-cash" | "cash-crypto" | "loan";
  label: string;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number; // Conversion rate to NGN
};

export type Wallet = {
  id: string;
  name: string;
  icon: string;
};

export type Bank = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export const tabs: Tab[] = [
  { id: "crypto-cash", label: "Crypto to cash" },
  { id: "cash-crypto", label: "Cash to crypto" },
  { id: "loan", label: "Crypto to fiat loan" },
];

export const tokens: Token[] = [
  { 
    id: "eth", 
    name: "ETH", 
    symbol: "ETH", 
    icon: "/assets/eth.svg",
    rate: 4500000 
  },
  { 
    id: "usdt-celo", 
    name: "USDT - CELO", 
    symbol: "USDT", 
    icon: "/assets/celo.svg",
    rate: 1650 
  },
  { 
    id: "usdt-ton", 
    name: "USDT - TON", 
    symbol: "USDT", 
    icon: "/assets/ton.svg",
    rate: 1645 
  },
  { 
    id: "usdt-bnb", 
    name: "USDT - BNB", 
    symbol: "USDT", 
    icon: "/assets/bnb.svg",
    rate: 1655 
  },
];

export const wallets: Wallet[] = [
  { id: "metamask", name: "Metamask", icon: "/assets/metamask.svg" },
  { id: "rainbow", name: "Rainbow", icon: "/assets/rainbow.svg" },
  { id: "walletconnect", name: "WalletConnect", icon: "/assets/walletConnect.svg" },
  { id: "other", name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)", icon: "/assets/otherCryptoWallets.svg" },
];

export const banks: Bank[] = [
  { id: "bank-1", name: "First Bank", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> },
  { id: "bank-2", name: "GTBank", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> },
  { id: "bank-3", name: "Access Bank", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> },
  { id: "bank-4", name: "UBA", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> },
  { id: "bank-5", name: "Zenith Bank", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> },
];

export const paymentMethods: Bank[] = [
    { id: "bank-transfer", name: "Bank", icon: <Landmark className="mr-3 w-6 h-6 text-gray-600" /> }
];
