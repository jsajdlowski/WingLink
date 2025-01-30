package com.winglink.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.winglink.backend.entity.Airport;
import com.winglink.backend.repository.AirportRepository;

public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<Airport> findAllFlights() {
        return airportRepository.findAll();
    }

    public Optional<Airport> findAirportById(Long id) {
        return airportRepository.findById(id);
    }

    public Airport saveAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}
