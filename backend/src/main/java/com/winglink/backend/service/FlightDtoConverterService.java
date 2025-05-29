package com.winglink.backend.service;

import com.winglink.backend.dto.googleflightsapi.GoogleFlightsFlightDto;
import com.winglink.backend.dto.googleflightsapi.SingleFlightDetail;
import com.winglink.backend.entity.Airport;
import com.winglink.backend.entity.Flight;
import com.winglink.backend.entity.FlightTrip;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class FlightDtoConverterService {
    private final AirportService airportService;
    private final FlightService flightService;

    public FlightDtoConverterService(AirportService airportService, FlightService flightService) {
        this.airportService = airportService;
        this.flightService = flightService;
    }

    public FlightTrip convertToEntity(GoogleFlightsFlightDto dto) {
        FlightTrip flightTrip = new FlightTrip();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");

        flightTrip.setDepartureTime(LocalDateTime.parse(dto.departure_time(), formatter));
        flightTrip.setArrivalTime(LocalDateTime.parse(dto.arrival_time(), formatter));

        // Assuming you resolve Airport entities from airport codes (via DB or mapping service)
        Airport origin = airportService.findAirportByCode(dto.flights().getFirst().departure_airport().airport_code()).orElse(null);
        Airport destination = airportService.findAirportByCode(dto.flights().getLast().arrival_airport().airport_code()).orElse(null);

        flightTrip.setOrigin(origin);
        flightTrip.setDestination(destination);

        // If price is part of DTO
        flightTrip.setPrice(dto.price());

//        System.out.println(dto.flights());
        List<Flight> flights = dto.flights()
                .stream()
                .map(flightDto -> flightService.findFlightByNumber(flightDto.flight_number()).orElse(convertSingleFlightToEntity(flightDto)))
                .toList();
        flightTrip.setFlights(flights);

        return flightTrip;
    }

    public Flight convertSingleFlightToEntity(SingleFlightDetail dto) {
        Flight flight = new Flight();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d HH:mm");

        flight.setDepartureTime(LocalDateTime.parse(dto.departure_airport().time(), formatter));
        flight.setArrivalTime(LocalDateTime.parse(dto.arrival_airport().time(), formatter));

        Airport origin = airportService.findAirportByCode(dto.departure_airport().airport_code()).orElse(null);
        Airport destination = airportService.findAirportByCode(dto.arrival_airport().airport_code()).orElse(null);

        flight.setOrigin(origin);
        flight.setDestination(destination);

        flight.setFlightNumber(dto.flight_number());

        flight.setAirline(dto.airline());
        flight.setAirlineLogo(dto.airline_logo());

        return flight;
    }

}
