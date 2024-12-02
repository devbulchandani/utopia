import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";

// Declare the ethereum property on the window object
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string }) => Promise<string[]>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (
        event: string,
        callback: (...args: any[]) => void
      ) => void;
      isMetaMask?: boolean;
    };
  }
}

export default function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null);

  // Check if MetaMask is installed on component mount
  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkMetaMaskConnection();
  }, []);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        // Listen for account changes
        window.ethereum.on?.("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0] || null);
        });
      } else {
        window.open("https://metamask.io/download.html", "_blank");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    window.ethereum?.removeListener?.("accountsChanged", () => {});
  };

  // Format account address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div>
      {account ? (
        <button
          onClick={disconnectWallet}
          className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-xl hover:bg-zinc-600 transition-colors"
        >
          <Wallet className="h-4 w-4" />
          <span>{formatAddress(account)}</span>
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-xl hover:bg-zinc-600 transition-colors"
        >
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
}