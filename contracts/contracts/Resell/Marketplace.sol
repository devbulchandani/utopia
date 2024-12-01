// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Marketplace {
    IERC1155 public eventTicketing;

    struct TicketListing {
        address seller;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => TicketListing) private ticketListings;

    constructor(address _eventTicketing) {
        eventTicketing = IERC1155(_eventTicketing);
    }

    function listTicket(uint256 ticketId, uint256 price) public {
        require(eventTicketing.balanceOf(msg.sender, ticketId) > 0, "You don't own this ticket");
        ticketListings[ticketId] = TicketListing(msg.sender, price, true);
    }

    function executeTicketSale(uint256 ticketId) public {
        TicketListing storage listing = ticketListings[ticketId];
        require(listing.isActive, "Ticket is not listed for sale");
        require(msg.sender != listing.seller, "Seller cannot buy their own ticket");

        listing.isActive = false;
        payable(listing.seller).transfer(listing.price);
    }

    function getTicketSeller(uint256 ticketId) public view returns (address) {
        return ticketListings[ticketId].seller;
    }

    function getTicketPrice(uint256 ticketId) public view returns (uint256) {
        return ticketListings[ticketId].price;
    }
}

