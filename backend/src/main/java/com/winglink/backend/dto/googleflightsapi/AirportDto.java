package com.winglink.backend.dto.googleflightsapi;

public record AirportDto(
        String airport_name,
        String airport_code,
        String time
) {}