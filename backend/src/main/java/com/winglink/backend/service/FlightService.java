package com.winglink.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.winglink.backend.entity.Flight;
import com.winglink.backend.repository.FlightRepository;

@Service
public class FlightService {

    private FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> findAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> findFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public Optional<Flight> findFlightByNumber(String flightNumber) {
        return flightRepository.findFirstByFlightNumber(flightNumber);
    }

    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
