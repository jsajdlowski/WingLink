package com.winglink.backend.dto.googleflightsapi;

public record FlightDetail(
        AirportDto departure_airport,
        AirportDto arrival_airport
) {}
