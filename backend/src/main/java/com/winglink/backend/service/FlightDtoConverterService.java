package com.winglink.backend.service;

import com.winglink.backend.dto.googleflightsapi.GoogleFlightsFlightDto;
import com.winglink.backend.entity.Airport;
import com.winglink.backend.entity.Flight;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FlightDtoConverterService {
    private final AirportService airportService;

    public FlightDtoConverterService(AirportService airportService) {
        this.airportService = airportService;
    }

    public Flight convertToEntity(GoogleFlightsFlightDto dto) {
        Flight flight = new Flight();
        flight.setFlightNumber(dto.flight_number());
        flight.setAirline(dto.airline());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");

        flight.setDepartureTime(LocalDateTime.parse(dto.departure_time(), formatter));
        flight.setArrivalTime(LocalDateTime.parse(dto.arrival_time(), formatter));

        // Assuming you resolve Airport entities from airport codes (via DB or mapping service)
        Airport origin = airportService.findAirportByCode(dto.flights().get(0).departure_airport().airport_code()).orElse(null);
        Airport destination = airportService.findAirportByCode(dto.flights().getLast().arrival_airport().airport_code()).orElse(null);

        flight.setOrigin(origin);
        flight.setDestination(destination);

        // If price is part of DTO
        flight.setPrice(dto.price());

        return flight;
    }

}
