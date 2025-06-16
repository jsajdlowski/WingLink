package com.winglink.backend.dto;

import com.winglink.backend.entity.Ticket;

public class TicketDtoConverter {
    public static TicketResponseDto convertToTicketDto(Ticket ticket) {
        if (ticket == null) {
            return null;
        }
        return new TicketResponseDto(
                ticket.getId(),
                ticket.getFirstName(),
                ticket.getLastName(),
                ticket.getSeatClass().name(),
                ticket.getFlight()
        );
    }
}
