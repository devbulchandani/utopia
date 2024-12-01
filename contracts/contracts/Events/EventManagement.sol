// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventManagement {
    uint256 _eventIds;

    struct Event {
        uint256 eventId;
        string name;
        uint256 ticketSupply;
        uint256 ticketPrice;
        bool isActive;
    }

    mapping(uint256 => Event) private events;

    function createEvent(string memory name, uint256 ticketSupply, uint256 ticketPrice) public returns (uint256) {
        _eventIds++;
        uint256 newEventId = _eventIds;

        events[newEventId] = Event(newEventId, name, ticketSupply, ticketPrice, true);
        
        return newEventId;
    }

    function isEventActive(uint256 eventId) public view returns (bool) {
        return events[eventId].isActive;
    }

    function getTicketSupply(uint256 eventId) public view returns (uint256) {
        return events[eventId].ticketSupply;
    }

    function getTicketPrice(uint256 eventId) public view returns (uint256) {
        return events[eventId].ticketPrice;
    }

    function updateTicketSupply(uint256 eventId, uint256 soldAmount) public {
        events[eventId].ticketSupply -= soldAmount;
    }

    function getEventDetails(uint256 eventId) public view returns (Event memory) {
        return events[eventId];
    }
}

