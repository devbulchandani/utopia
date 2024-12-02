# Utopia: Revolutinalizing Events

## Project Overview

Utopia is not same old event platform like in web2 but it has something more to offer to the people.Our platform bridges together the functionalities of the Creation,deletion and management of events with the web3 technology and also ai abilities.These abilities allow minted nft tickets and events to be safer and also ai make finding these events faster and better.

### Key Features

#### Event Management
- Create, post, and update events seamlessly.
- Create the event data with you voice and Ai does the other work.
- Minted NFT tickets and event for transparent transactions and exchange.

#### Blockchain Integration
- Blockchain is used for create a event and mint it as a parent NFT 
- Child NFTs representing individual tickets
- Enhanced ticket transferability and resale transparency as it makes transferring easier 
  and faster but safer from frauds.

#### AI Capabilities
- AI-powered event assistant to query all your doubts about the events on going ,upcoming or ended.
- Intelligent query resolution for event-related questions
- Automated event content generation

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Blockchain**: Ethereum/Web3 Integration
- **Smart Contracts**: Solidity
- **AI Integration**: HuggingFace hub/llama 3.2 3B Instruct
- **Styling**: Tailwind and other Ai tools.

## Prerequisites

- Node.js (v18+ recommended)
- npm
- Ethereum Wallet (MetaMask/Coinbase recommended)
- Hardhat or Truffle for smart contract development
- Solidity to write smart contracts

## Installation

1. Clone the repository
```bash
git clone https://github.com/devbulchandani/utopia.git
cd utopia
```

2. Install dependencies on client ,server ,Bot and contracts folders
```bash
npm install
```

3. Set up environment variables
Create a `.env` file for client with the following:
```
VITE_CLERK_PUBLISHABLE_KEY=api_key
PINATA_API_KEY=api_key
PINATA_JWT=api_key
REACT_APP_CONTRACT_ADDRESS=api_key
HUGGINGFACEHUB_API_KEY=api_key
```
##Set up environment variables
Create a `.env` file for server with the following:
```
MONGO_URI=api_key
PORT=port
CLOUDINARY_CLOUD_NAME=api_key
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_key
```
## Running the Project

### Development Mode for both client and server.
```bash
npm run dev
```
### Development Mode for both Bot.
```bash
node bot
```

### Build for Production
```bash
npm run build
```

## Smart Contract Development

### Compile Contracts
```bash
npx hardhat compile
```

### Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network [network]
```

## Testing

### Run Frontend Tests
```bash
npm run test
```

### Run Smart Contract Tests
```bash
npx hardhat test
```
### Run Backend Tests
```bash
npm run dev
```
## Key Components

### Event NFT Structure
- **Parent NFT**: Represents the entire event
- **Child NFTs**: Individual ticket tokens
- Enables secure and transparent ticket transfers

### AI Capabilities
- Automatic event description generation
- Image creation for events
- Intelligent event assistant chatbot

## Security Considerations
- Use of simple blockchain approach keeping safety in mind
- Currently used open source model but later will use better paid model for safety 

## Future Roadmap
- Multi-chain support
- Enhanced AI event recommendation
- Decentralized event discovery
- Improved ticketing mechanisms

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License]

## Contact

Team Kairos
- Project Link: https://github.com/devbulchandani/utopia
