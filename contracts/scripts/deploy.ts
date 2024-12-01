const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
    
    const initialOwner = "0x3862653D1167dc0Faf69E6a94c80e0AcF87F42d3"
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy EventTicketing contract
  const EventTicketing = await ethers.getContractFactory("EventTicketing");
  const eventTicketing = await EventTicketing.deploy("https://api.yourdomain.com/metadata/{id}.json",initialOwner);
  await eventTicketing.deploymentTransaction().wait();

  const eventTicketingAddress = await eventTicketing.deploymentTransaction().wait();
  console.log("EventTicketing deployed to:", eventTicketingAddress);

  // Get addresses of other contracts
  const eventManagementAddress = await eventTicketing.eventManagement();
  const ticketManagementAddress = await eventTicketing.ticketManagement();
  const marketplaceAddress = await eventTicketing.marketplace();

    
  console.log("EventManagement deployed to:", eventManagementAddress);
  console.log("TicketManagement deployed to:", ticketManagementAddress);
  console.log("Marketplace deployed to:", marketplaceAddress);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });