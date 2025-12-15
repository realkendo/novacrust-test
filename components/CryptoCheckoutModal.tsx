"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Joi from "joi";
import { tabs, tokens, wallets, banks, paymentMethods, Token } from "@/lib/data";

import { CustomSelect } from "@/components/ui/CustomSelect";
import { TabNavigation } from "@/components/ui/TabNavigation";
import { CurrencyInput, TokenSelector } from "@/components/ui/CurrencyInput";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Joi Schemas
const step1Schema = Joi.object({
  amountPay: Joi.number().greater(0).required().messages({
      "number.base": "Amount must be a number",
      "number.greater": "Amount must be greater than 0",
      "any.required": "Amount is required"
  }),
  selectedWallet: Joi.object().required().messages({ "any.required": "Please select a wallet" }),
  selectedPayToBank: Joi.object().required().messages({ "any.required": "Please select a payment method" }),
});

const step2Schema = Joi.object({
  recipientBank: Joi.object().required().messages({ "any.required": "Bank is required" }),
  accountNumber: Joi.string().pattern(/^\d+$/).min(10).required().messages({
      "string.pattern.base": "Account number must ensure digits only",
      "string.min": "Account number must be at least 10 digits",
      "any.required": "Account number is required"
  }),
});

export default function CryptoCheckoutModal() {
  const [step, setStep] = useState<1 | 2>(1);
  const [activeTab, setActiveTab] = useState<"crypto-cash" | "cash-crypto" | "loan">("crypto-cash");
  const [amountPay, setAmountPay] = useState("0.10");
  const [amountReceive, setAmountReceive] = useState("");

  // Initialize with the first token (ETH)
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  
  const [selectedWallet, setSelectedWallet] = useState<typeof wallets[0] | null>(null);
  
  // Step 1 Bank Selection (Pay To) - now uses Payment Method (Bank)
  const [selectedPayToBank, setSelectedPayToBank] = useState<typeof banks[0] | null>(null);

  // Step 2 Recipient Details
  const [recipientBank, setRecipientBank] = useState<typeof banks[0] | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("ODUTUGA GBEKE"); // Mock resolved name

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({ amountPay: true }); // Default amount is pre-filled

  const isStep1Valid = !errors.amountPay && !errors.selectedWallet && !errors.selectedPayToBank && selectedWallet && selectedPayToBank;
  const isStep2Valid = !errors.recipientBank && !errors.accountNumber && recipientBank && accountNumber;

  // Calculate Exchange Rate
  useEffect(() => {
    const pay = parseFloat(amountPay);
    if (!isNaN(pay) && selectedToken) {
        const receiveValue = pay * selectedToken.rate;
        setAmountReceive(receiveValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    } else {
        setAmountReceive("0.00");
    }
  }, [amountPay, selectedToken]);

  // Validate Step 1
  useEffect(() => {
    const { error } = step1Schema.validate({
        amountPay: parseFloat(amountPay),
        selectedWallet,
        selectedPayToBank
    }, { abortEarly: false, allowUnknown: true });
    
    const newErrors: Record<string, string> = {};
    if (error) {
        error.details.forEach(detail => {
            if (detail.path[0]) newErrors[detail.path[0] as string] = detail.message;
        });
    }
    // Only update errors for Step 1 fields
    setErrors(prev => ({ ...prev, amountPay: newErrors.amountPay, selectedWallet: newErrors.selectedWallet, selectedPayToBank: newErrors.selectedPayToBank }));
  }, [amountPay, selectedWallet, selectedPayToBank]);

  // Validate Step 2
  useEffect(() => {
    const { error } = step2Schema.validate({
        recipientBank,
        accountNumber
    }, { abortEarly: false, allowUnknown: true });

    const newErrors: Record<string, string> = {};
    if (error) {
        error.details.forEach(detail => {
            if (detail.path[0]) newErrors[detail.path[0] as string] = detail.message;
        });
    }
    // Only update errors for Step 2 fields
    setErrors(prev => ({ ...prev, recipientBank: newErrors.recipientBank, accountNumber: newErrors.accountNumber }));
  }, [recipientBank, accountNumber]);

  const markTouched = (field: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));
  }

  // Static NGN Badge for Receiver
  const StaticNgnBadge = () => (
    <button className="flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 transition-colors shrink-0">
        <div className="w-5 h-[15px] relative mr-2">
        <Image src="/assets/nigeria.svg" alt="NGN" fill className="object-contain rounded-sm" />
        </div>
        <span className="font-semibold text-gray-700 mr-2">NGN</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );

  return (
    <div className="w-full max-w-[640px] bg-white rounded-[30px] border border-[#CCF6E5] shadow-lg opacity-100 flex flex-col items-center pb-8 sm:pb-12 min-h-[700px] sm:h-[758px] transition-all duration-300">
        
        {step === 1 ? (
          <>
            {/* Render Tabs */}
            <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={(id) => setActiveTab(id)} 
            />

            <div className="w-full px-6 sm:px-12 flex flex-col gap-6">
              {/* You Pay Input */}
              <CurrencyInput 
                label="You pay"
                amount={amountPay}
                onAmountChange={(val) => {
                    setAmountPay(val);
                    markTouched("amountPay");
                }}
                error={touched.amountPay ? errors.amountPay : undefined}
                selector={
                    <TokenSelector 
                        selected={selectedToken} 
                        items={tokens} 
                        onSelect={(item) => setSelectedToken(item as Token)} 
                    />
                }
              />

              {/* You Receive Input */}
              <CurrencyInput 
                label="You receive"
                amount={amountReceive}
                readOnly
                selector={<StaticNgnBadge />}
              />

              {/* Pay From - Wallet Selector */}
              <CustomSelect 
                label="Pay from"
                items={wallets}
                selected={selectedWallet}
                onSelect={(item) => {
                    setSelectedWallet(item as any);
                    markTouched("selectedWallet");
                }}
                placeholder="Select an option"
              />

              {/* Pay To - Bank Selector */}
              <CustomSelect 
                label="Pay to"
                items={paymentMethods}
                selected={selectedPayToBank}
                onSelect={(item) => {
                    setSelectedPayToBank(item as any);
                    markTouched("selectedPayToBank");
                }}
                placeholder="Select an option"
              />

            </div>

            {/* Footer Button */}
            <div className="mt-auto pt-8 w-full px-6 sm:px-12">
              <Button 
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
              >
                Convert now
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Header Steps */}
            <div className="w-full px-8 pt-8 pb-4 flex items-center mb-4">
               <button 
                  onClick={() => setStep(1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-auto"
                >
                  <ArrowLeft className="w-6 h-6 text-[#003D2B]" />
               </button>
               <h2 className="text-[#003D2B] text-[20px] font-bold absolute left-1/2 transform -translate-x-1/2">Recipient details</h2>
            </div>
            
            <div className="w-full px-6 sm:px-12 flex flex-col gap-6">
                <CustomSelect 
                    label="Bank"
                    items={banks}
                    selected={recipientBank}
                    onSelect={(item) => {
                        setRecipientBank(item as any);
                        markTouched("recipientBank");
                    }}
                    placeholder="Select an option"
                />

                <Input 
                    label="Account number"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={(e) => {
                        setAccountNumber(e.target.value);
                    }}
                    onBlur={() => markTouched("accountNumber")}
                    error={touched.accountNumber ? errors.accountNumber : undefined}
                />

                <Input 
                    label="Account Name" 
                    value={accountName}
                    disabled
                    readOnly
                />
            </div>

            <div className="mt-auto pt-8 w-full px-6 sm:px-12">
              <Button 
                onClick={() => { console.log("Complete") }}
                disabled={!isStep2Valid}
              >
                Next
              </Button>
            </div>
          </>
        )}
    </div>
  );
}
