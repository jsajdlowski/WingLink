package com.winglink.backend.dto;

import com.winglink.backend.entity.FlightTrip;

public record TicketResponseDto(Long id, String firstName, String lastName, String seatClass, FlightTrip flightTrip) {
}
