package com.winglink.backend.service;

import com.winglink.backend.entity.FlightTrip;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightTripSearchService {
    private final ExternalApiService externalApiService;
    private final FlightTripService flightTripService;

    public FlightTripSearchService(ExternalApiService externalApiService, FlightTripService flightTripService) {
        this.externalApiService = externalApiService;
        this.flightTripService = flightTripService;
    }

    public List<FlightTrip> searchFlightTrips(String originCode, String destinationCode, LocalDateTime departureDate) {
        List<FlightTrip> cachedFlightTrips = flightTripService.searchFlightTripsWithAirportsAndDate(originCode, destinationCode, departureDate);
        if (!cachedFlightTrips.isEmpty()) {
            return cachedFlightTrips;
        } else {
            return externalApiService.getFlightTrips(originCode, destinationCode, departureDate);
        }
    }
}
