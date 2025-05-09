package com.winglink.backend.dto.googleflightsapi;

public record SingleFlightDetail(
        SingleFlightAirportDto departure_airport,
        SingleFlightAirportDto arrival_airport,
        String airline,
        String airline_logo,
        String flight_number
) {}
