// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketManagement {
    uint256 _ticketIds;

    mapping(uint256 => uint256) private ticketToEvent;

    function mintTickets(uint256 eventId, uint256 amount) public returns (uint256[] memory) {
        uint256[] memory ticketIds = new uint256[](amount);

        for (uint256 i = 0; i < amount; i++) {
            _ticketIds++;
            uint256 newTicketId = _ticketIds;
            ticketToEvent[newTicketId] = eventId;
            ticketIds[i] = newTicketId;
        }

        return ticketIds;
    }

    function getTicketEvent(uint256 ticketId) public view returns (uint256) {
        return ticketToEvent[ticketId];
    }
}

