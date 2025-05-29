package com.winglink.backend.repository;

import com.winglink.backend.entity.FlightTrip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightTripRepository extends JpaRepository<FlightTrip, Long> {
  List<FlightTrip> findByOrigin_CodeAndDestination_Code(String originCode, String destinationCode);
  List<FlightTrip> findByOrigin_CountryAndDestination_Country(String originCountry, String destinationCountry);
  List<FlightTrip> findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(
          String originCode, String destinationCode, LocalDateTime start, LocalDateTime end);
  List<FlightTrip> findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetweenAndOrigin_CountryAndDestination_Country(
          String originCode, String destinationCode, LocalDateTime start, LocalDateTime end,
          String originCountry, String destinationCountry);

  List<FlightTrip> findAllByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(String originCode, String destinationCode, LocalDateTime departureTimeAfter, LocalDateTime departureTimeBefore);
}