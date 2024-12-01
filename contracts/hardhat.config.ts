import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_URL || "", // Define BASE_SEPOLIA_URL in your .env file
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 84532,
    },
  },
};

export default config;
