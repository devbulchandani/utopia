// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Events/EventManagement.sol";
import "./Resell/Marketplace.sol";
import "./Tickets/Ticketmanagement.sol";

contract EventTicketing is ERC1155, Ownable {

    EventManagement public eventManagement;
    TicketManagement public ticketManagement;
    Marketplace public marketplace;

    constructor(string memory uri, address initialOwner) ERC1155(uri) Ownable(initialOwner) {
        eventManagement = new EventManagement();
        ticketManagement = new TicketManagement();
        marketplace = new Marketplace(address(this));
    }

    function createEvent(string memory name, uint256 ticketSupply, uint256 ticketPrice) public onlyOwner {
        uint256 eventId = eventManagement.createEvent(name, ticketSupply, ticketPrice);
        _mint(msg.sender, eventId, 1, "");
    }

    function mintTickets(uint256 eventId, uint256 amount) public payable {
        require(eventManagement.isEventActive(eventId), "Event is not active");
        require(amount > 0 && amount <= eventManagement.getTicketSupply(eventId), "Invalid amount");
        require(msg.value >= eventManagement.getTicketPrice(eventId) * amount, "Insufficient payment");

        uint256[] memory ticketIds = ticketManagement.mintTickets(eventId, amount);
        for (uint256 i = 0; i < ticketIds.length; i++) {
            _mint(msg.sender, ticketIds[i], 1, "");
        }

        eventManagement.updateTicketSupply(eventId, amount);
    }

    function resellTicket(uint256 ticketId, uint256 price) public {
        require(balanceOf(msg.sender, ticketId) > 0, "You don't own this ticket");
        marketplace.listTicket(ticketId, price);
    }

    function buyResoldTicket(uint256 ticketId) public payable {
        address seller = marketplace.getTicketSeller(ticketId);
        uint256 price = marketplace.getTicketPrice(ticketId);
        require(msg.value >= price, "Insufficient payment");

        marketplace.executeTicketSale(ticketId);
        safeTransferFrom(seller, msg.sender, ticketId, 1, "");
    }

    function getEventDetails(uint256 eventId) public view returns (EventManagement.Event memory) {
        return eventManagement.getEventDetails(eventId);
    }

    function getTicketEvent(uint256 ticketId) public view returns (uint256) {
        return ticketManagement.getTicketEvent(ticketId);
    }
}

