package com.winglink.backend.dto.googleflightsapi;

import java.util.List;

public record DataWrapper(
        List<GoogleFlightsFlightDto> topFlights
) {}
