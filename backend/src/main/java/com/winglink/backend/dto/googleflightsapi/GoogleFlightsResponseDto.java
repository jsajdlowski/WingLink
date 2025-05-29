package com.winglink.backend.dto.googleflightsapi;

public record GoogleFlightsResponseDto(
        boolean status,
        String message,
        long timestamp,
        ItineraryDataWrapper data
) {}
