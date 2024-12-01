const { ethers } = require("hardhat");


async function main() {
  
  const fs = require("fs");

  const initialOwner = "0x3862653D1167dc0Faf69E6a94c80e0AcF87F42d3"; // Replace with a valid address

  const EventNFT = await ethers.getContractFactory("EventNFT");

  console.log("Deploying EventNFT contract...");

  const eventNFT = await EventNFT.deploy(initialOwner);

 
  await eventNFT.deploymentTransaction().wait();
  console.log("EventNFT contract deployed to:", await eventNFT.getAddress());





  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy(eventNFT.address);
  await ticketNFT.deploymentTransaction().wait();
  console.log("TicketNFT deployed to:", JSON.stringify(ticketNFT.address));


  const EventTicketMarketplace = await ethers.getContractFactory(
    "EventTicketMarketplace"
  );
  const marketplace = await EventTicketMarketplace.deploy(ticketNFT.address);
  await marketplace.deploymentTransaction().wait();
  console.log(
    "EventTicketMarketplace deployed to:",
    JSON.stringify(marketplace.address)
  );


// Save all deployed addresses to a file
const deployedAddresses = {
  EventNFT: eventNFT.address,
  TicketNFT: ticketNFT.address,
  Marketplace: marketplace.address,
};

fs.writeFileSync(
  "./deployedAddress.json",
  JSON.stringify(deployedAddresses, null, 2)
);

console.log("Deployment complete! Addresses saved to deployedAddress.json");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
