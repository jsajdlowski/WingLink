package com.winglink.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.winglink.backend.entity.Airport;
import com.winglink.backend.repository.AirportRepository;

@Service
public class AirportService {

    private AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<Airport> findAllFlights() {
        return airportRepository.findAll();
    }

    public Optional<Airport> findAirportById(Long id) {
        return airportRepository.findById(id);
    }

    public Optional<Airport> findAirportByCode(String code) {
        return airportRepository.findByCode(code);
    }

    public Airport saveAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}
