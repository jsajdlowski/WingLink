package com.winglink.backend.repository;

import com.winglink.backend.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;


@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByOrigin_CodeAndDestination_Code(String originCode, String destinationCode);
    List<Flight> findByOrigin_CountryAndDestination_Country(String originCountry, String destinationCountry);
    List<Flight> findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(
            String originCode, String destinationCode, LocalDateTime start, LocalDateTime end);
    List<Flight> findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetweenAndOrigin_CountryAndDestination_Country(
            String originCode, String destinationCode, LocalDateTime start, LocalDateTime end,
            String originCountry, String destinationCountry);

    Optional<Flight> findFirstByFlightNumber(String flightNumber);
}
