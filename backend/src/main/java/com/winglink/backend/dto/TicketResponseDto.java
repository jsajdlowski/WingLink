package com.winglink.backend.dto;

import com.winglink.backend.entity.Flight;

public record TicketResponseDto(Long id, String firstName, String lastName, String seatClass, Flight flight) {
}
