package com.winglink.backend.service;


import com.winglink.backend.entity.Flight;
import com.winglink.backend.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public Optional<Flight> updateFlight(Long id, Flight flightDetails) {
        return flightRepository.findById(id).map(flight -> {
            flight.setFlightNumber(flightDetails.getFlightNumber());
            flight.setOrigin(flightDetails.getOrigin());
            flight.setDestination(flightDetails.getDestination());
            flight.setDepartureTime(flightDetails.getDepartureTime());
            flight.setArrivalTime(flightDetails.getArrivalTime());
            flight.setAirline(flightDetails.getAirline());
            flight.setPrice(flightDetails.getPrice());
            return flightRepository.save(flight);
        });
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }

    public List<Flight> searchFlightsByAirportCode(String originCode, String destinationCode) {
        return flightRepository.findByOriginAndDestination(originCode, destinationCode);
    }

    public List<Flight> searchFlightsByCountry(String originCountry, String destinationCountry) {
        return flightRepository.findByOriginAndDestination(originCountry, destinationCountry);
    }
}
