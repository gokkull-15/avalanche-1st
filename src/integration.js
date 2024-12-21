import Web3 from "web3";
import contractABI from "./ABI/abi.json"; // Path to your ABI file

// Contract details
const contractAddress = "0xd887477308537d0644E8bD6B247524c502cEA9d6"; // Your contract address
let web3;
let contract;

const initializeWeb3 = () => {
  if (window.ethereum) {
    // Modern dapp browsers
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch((error) => {
      console.error("User denied account access", error);
    });
  } else if (window.web3) {
    // Legacy dapp browsers
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("Please install MetaMask to use this app");
  }
};

// Initialize contract
const initializeContract = () => {
  contract = new web3.eth.Contract(contractABI, contractAddress);
};

// Function to store form data in the contract
const storeFormData = async (name, message, amount) => {
  const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum account
  if (accounts.length === 0) {
    alert("No Ethereum account found. Please connect your wallet.");
    return;
  }

  try {
    // Call the storeFormData function in your contract
    await contract.methods
      .storeFormData(name, message, amount)
      .send({ from: accounts[0] });

    alert("Form data successfully stored in the blockchain");
  } catch (error) {
    console.error("Error storing form data:", error);
    alert("Failed to store form data");
  }
};

// Function to retrieve form data from the contract
const getFormData = async () => {
  const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum account
  if (accounts.length === 0) {
    alert("No Ethereum account found. Please connect your wallet.");
    return;
  }

  try {
    // Call the getFormData function in your contract
    const data = await contract.methods
      .getFormData()
      .call({ from: accounts[0] });

    console.log("Retrieved data:", data);
    return {
      name: data[0],
      message: data[1],
      amount: data[2],
    };
  } catch (error) {
    console.error("Error retrieving form data:", error);
    alert("Failed to retrieve form data");
  }
};

// Initialize Web3 and contract
initializeWeb3();
initializeContract();

// Export the functions for use in your components
export { storeFormData, getFormData };
