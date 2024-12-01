import { ethers } from "hardhat";
import fs from "fs";

async function main() {

  const EventNFT = await ethers.getContractFactory("EventNFT");

  console.log("Deploying EventNFT contract...");

  const eventNFT = await EventNFT.deploy();

 
  await eventNFT.deploymentTransaction().wait();


  
  console.log("EventNFT contract deployed to:", eventNFT.address);

  const fs = require('fs');
  fs.writeFileSync(
      './deployedAddress.json',
      
      JSON.stringify({ address: eventNFT.address }, null, 2)
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
