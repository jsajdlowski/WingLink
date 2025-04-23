package com.winglink.backend.dto.googleflightsapi;

public record SingleFlightAirportDto(
        String airport_name,
        String airport_code,
        String time
) {}