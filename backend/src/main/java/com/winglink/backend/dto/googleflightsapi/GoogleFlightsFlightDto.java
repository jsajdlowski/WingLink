package com.winglink.backend.dto.googleflightsapi;

import java.math.BigDecimal;
import java.util.List;

public record GoogleFlightsFlightDto(
        String departure_time,
        String arrival_time,
        List<SingleFlightDetail> flights,
        BigDecimal price // Optional, if present
) {}
