import React, { useState } from "react";

const UpiPaymentForm = () => {
  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePay = (e) => {
    e.preventDefault();
    if (!upiId || !name || !amount) {
      setError("Please fill all required fields.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Redirecting to your UPI app...");
    // Build UPI deep link
    const upiLink = `upi://pay?pa=${encodeURIComponent(
      upiId
    )}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(
      amount
    )}&tn=${encodeURIComponent(note)}`;
    // Open UPI link
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-600 rounded-full p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">UPI Payment</h2>
        </div>
        <form onSubmit={handlePay} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipient UPI ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. username@bank"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount (INR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 250"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Note <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Billsplit settlement"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 rounded p-2 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 rounded p-2 text-sm">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg shadow"
          >
            Pay Now
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            You will be redirected to your UPI app to complete the payment.
            <br />
            Works best on mobile devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpiPaymentForm;
