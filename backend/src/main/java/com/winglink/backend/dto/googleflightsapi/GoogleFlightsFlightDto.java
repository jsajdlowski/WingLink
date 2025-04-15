package com.winglink.backend.dto.googleflightsapi;

import java.math.BigDecimal;
import java.util.List;

public record GoogleFlightsFlightDto(
        String departure_time,
        String arrival_time,
        List<FlightDetail> flights,
        String airline,
        String flight_number,
        BigDecimal price // Optional, if present
) {}
