import React, { useState } from "react";
import { storeFormData, getFormData } from "../integration";

const FormPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [storedData, setStoredData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store the data in the contract
    await storeFormData(name, message, amount);
    setName("");
    setMessage("");
    setAmount("");
  };

  const handleRetrieve = async () => {
    // Retrieve the stored data from the contract
    const data = await getFormData();
    setStoredData(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your message"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label htmlFor="amount" className="block text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter amount"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleRetrieve}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Retrieve Stored Data
          </button>
          {storedData && (
            <div className="mt-4 text-gray-700">
              <p>
                <strong>Name:</strong> {storedData.name}
              </p>
              <p>
                <strong>Message:</strong> {storedData.message}
              </p>
              <p>
                <strong>Amount:</strong> {storedData.amount}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
