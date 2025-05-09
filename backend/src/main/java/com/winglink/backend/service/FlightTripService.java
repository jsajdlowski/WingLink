package com.winglink.backend.service;


import com.winglink.backend.entity.FlightTrip;
import com.winglink.backend.repository.FlightTripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


@Service
public class FlightTripService {

    private final FlightTripRepository flightTripRepository;

    public FlightTripService(FlightTripRepository flightTripRepository) {
        this.flightTripRepository = flightTripRepository;
    }

    public List<FlightTrip> getAllFlightTrips() {
        return flightTripRepository.findAll();
    }

    public Optional<FlightTrip> getFlightTripById(Long id) {
        return flightTripRepository.findById(id);
    }

    public FlightTrip createFlightTrip(FlightTrip flightTrip) {
        return flightTripRepository.save(flightTrip);
    }

    public Optional<FlightTrip> updateFlightTrip(Long id, FlightTrip flightTripDetails) {
        return flightTripRepository.findById(id).map(flightTrip -> {
//            flightTrip.setFlightNumber(flightTripDetails.getFlightNumber());
            flightTrip.setOrigin(flightTripDetails.getOrigin());
            flightTrip.setDestination(flightTripDetails.getDestination());
            flightTrip.setDepartureTime(flightTripDetails.getDepartureTime());
            flightTrip.setArrivalTime(flightTripDetails.getArrivalTime());
//            flightTrip.setAirline(flightTripDetails.getAirline());
            flightTrip.setPrice(flightTripDetails.getPrice());
            return flightTripRepository.save(flightTrip);
        });
    }

    public void deleteFlightTrip(Long id) {
        flightTripRepository.deleteById(id);
    }

    public List<FlightTrip> searchFlightTripsCombined(String originCode, String destinationCode, String originCountry, String destinationCountry, LocalDateTime departureDate) {
        if (departureDate != null) {
            return flightTripRepository.findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetweenAndOrigin_CountryAndDestination_Country(
                    originCode.toUpperCase(), destinationCode.toUpperCase(), departureDate.withHour(0).withMinute(0), departureDate.withHour(23).withMinute(59),
                    originCountry, destinationCountry);
        } else if (originCode != null && destinationCode != null) {
            return flightTripRepository.findByOrigin_CodeAndDestination_Code(originCode.toUpperCase(), destinationCode.toUpperCase());
        } else if (originCountry != null && destinationCountry != null) {
            return flightTripRepository.findByOrigin_CountryAndDestination_Country(originCountry, destinationCountry);
        } else {
            return flightTripRepository.findAll();
        }
    }

    public List<FlightTrip> searchFlightTripsWithAirportsAndDate(String originCode, String destinationCode, LocalDateTime departureDate) {
        return flightTripRepository.findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(originCode.toUpperCase(), destinationCode.toUpperCase(), departureDate.withHour(0).withMinute(0), departureDate.withHour(23).withMinute(59));
    }
}
