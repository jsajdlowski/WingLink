package com.winglink.backend.service;

import com.winglink.backend.entity.Airport;
import com.winglink.backend.entity.FlightTrip;
import com.winglink.backend.repository.FlightTripRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightTripServiceTest {

    @Mock
    private FlightTripRepository flightTripRepository;

    @InjectMocks
    private FlightTripService flightTripService;

    private FlightTrip flightTrip1;
    private FlightTrip flightTrip2;
    private Airport originAirport;
    private Airport destinationAirport;

    @BeforeEach
    void setUp() {
        originAirport = new Airport();
        originAirport.setId(1L);
        originAirport.setCode("JFK");
        originAirport.setName("John F. Kennedy International Airport");
        originAirport.setCountry("USA");
        originAirport.setCity("New York");

        destinationAirport = new Airport();
        destinationAirport.setId(2L);
        destinationAirport.setCode("LHR");
        destinationAirport.setName("London Heathrow Airport");
        destinationAirport.setCountry("UK");
        destinationAirport.setCity("London");

        flightTrip1 = new FlightTrip();
        flightTrip1.setId(1L);
        flightTrip1.setOrigin(originAirport);
        flightTrip1.setDestination(destinationAirport);
        flightTrip1.setDepartureTime(LocalDateTime.of(2025, 6, 1, 10, 0));
        flightTrip1.setArrivalTime(LocalDateTime.of(2025, 6, 1, 18, 0));
        flightTrip1.setPrice(new BigDecimal("599.99"));
        flightTrip1.setFlights(Collections.emptyList());

        flightTrip2 = new FlightTrip();
        flightTrip2.setId(2L);
        flightTrip2.setOrigin(destinationAirport);
        flightTrip2.setDestination(originAirport);
        flightTrip2.setDepartureTime(LocalDateTime.of(2025, 6, 2, 12, 0));
        flightTrip2.setArrivalTime(LocalDateTime.of(2025, 6, 2, 20, 0));
        flightTrip2.setPrice(new BigDecimal("699.99"));
        flightTrip2.setFlights(Collections.emptyList());
    }

    @Test
    void getAllFlightTrips_ShouldReturnAllFlightTrips() {
        // Given
        List<FlightTrip> expectedFlightTrips = Arrays.asList(flightTrip1, flightTrip2);
        when(flightTripRepository.findAll()).thenReturn(expectedFlightTrips);

        // When
        List<FlightTrip> actualFlightTrips = flightTripService.getAllFlightTrips();

        // Then
        assertEquals(2, actualFlightTrips.size());
        assertEquals(expectedFlightTrips, actualFlightTrips);
        verify(flightTripRepository, times(1)).findAll();
    }

    @Test
    void getFlightTripById_WhenFlightTripExists_ShouldReturnFlightTrip() {
        // Given
        Long flightTripId = 1L;
        when(flightTripRepository.findById(flightTripId)).thenReturn(Optional.of(flightTrip1));

        // When
        Optional<FlightTrip> result = flightTripService.getFlightTripById(flightTripId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(flightTrip1, result.get());
        verify(flightTripRepository, times(1)).findById(flightTripId);
    }

    @Test
    void getFlightTripById_WhenFlightTripDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long flightTripId = 999L;
        when(flightTripRepository.findById(flightTripId)).thenReturn(Optional.empty());

        // When
        Optional<FlightTrip> result = flightTripService.getFlightTripById(flightTripId);

        // Then
        assertFalse(result.isPresent());
        verify(flightTripRepository, times(1)).findById(flightTripId);
    }

    @Test
    void createFlightTrip_ShouldReturnSavedFlightTrip() {
        // Given
        when(flightTripRepository.save(any(FlightTrip.class))).thenReturn(flightTrip1);

        // When
        FlightTrip result = flightTripService.createFlightTrip(flightTrip1);

        // Then
        assertEquals(flightTrip1, result);
        verify(flightTripRepository, times(1)).save(flightTrip1);
    }

    @Test
    void updateFlightTrip_WhenFlightTripExists_ShouldUpdateAndReturnFlightTrip() {
        // Given
        Long flightTripId = 1L;
        FlightTrip updatedDetails = new FlightTrip();
        updatedDetails.setOrigin(destinationAirport);
        updatedDetails.setDestination(originAirport);
        updatedDetails.setDepartureTime(LocalDateTime.of(2025, 6, 3, 14, 0));
        updatedDetails.setArrivalTime(LocalDateTime.of(2025, 6, 3, 22, 0));
        updatedDetails.setPrice(new BigDecimal("799.99"));

        when(flightTripRepository.findById(flightTripId)).thenReturn(Optional.of(flightTrip1));
        when(flightTripRepository.save(any(FlightTrip.class))).thenReturn(flightTrip1);

        // When
        Optional<FlightTrip> result = flightTripService.updateFlightTrip(flightTripId, updatedDetails);

        // Then
        assertTrue(result.isPresent());
        verify(flightTripRepository, times(1)).findById(flightTripId);
        verify(flightTripRepository, times(1)).save(flightTrip1);

        // Verify that the flight trip was updated with new details
        assertEquals(destinationAirport, flightTrip1.getOrigin());
        assertEquals(originAirport, flightTrip1.getDestination());
        assertEquals(LocalDateTime.of(2025, 6, 3, 14, 0), flightTrip1.getDepartureTime());
        assertEquals(LocalDateTime.of(2025, 6, 3, 22, 0), flightTrip1.getArrivalTime());
        assertEquals(new BigDecimal("799.99"), flightTrip1.getPrice());
    }

    @Test
    void updateFlightTrip_WhenFlightTripDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long flightTripId = 999L;
        FlightTrip updatedDetails = new FlightTrip();

        when(flightTripRepository.findById(flightTripId)).thenReturn(Optional.empty());

        // When
        Optional<FlightTrip> result = flightTripService.updateFlightTrip(flightTripId, updatedDetails);

        // Then
        assertFalse(result.isPresent());
        verify(flightTripRepository, times(1)).findById(flightTripId);
        verify(flightTripRepository, never()).save(any(FlightTrip.class));
    }

    @Test
    void deleteFlightTrip_ShouldCallRepositoryDeleteById() {
        // Given
        Long flightTripId = 1L;

        // When
        flightTripService.deleteFlightTrip(flightTripId);

        // Then
        verify(flightTripRepository, times(1)).deleteById(flightTripId);
    }

    @Test
    void searchFlightTripsCombined_WithAllParameters_ShouldCallCorrectRepositoryMethod() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        String originCountry = "USA";
        String destinationCountry = "UK";
        LocalDateTime departureDate = LocalDateTime.of(2025, 6, 1, 10, 0);
        List<FlightTrip> expectedResults = Arrays.asList(flightTrip1);

        when(flightTripRepository.findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetweenAndOrigin_CountryAndDestination_Country(
                eq(originCode), eq(destinationCode), any(LocalDateTime.class), any(LocalDateTime.class),
                eq(originCountry), eq(destinationCountry)))
                .thenReturn(expectedResults);

        // When
        List<FlightTrip> result = flightTripService.searchFlightTripsCombined(
                originCode, destinationCode, originCountry, destinationCountry, departureDate);

        // Then
        assertEquals(expectedResults, result);
        verify(flightTripRepository, times(1))
                .findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetweenAndOrigin_CountryAndDestination_Country(
                        eq(originCode), eq(destinationCode), any(LocalDateTime.class), any(LocalDateTime.class),
                        eq(originCountry), eq(destinationCountry));
    }

    @Test
    void searchFlightTripsCombined_WithOnlyAirportCodes_ShouldCallCorrectRepositoryMethod() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        List<FlightTrip> expectedResults = Arrays.asList(flightTrip1);

        when(flightTripRepository.findByOrigin_CodeAndDestination_Code(originCode, destinationCode))
                .thenReturn(expectedResults);

        // When
        List<FlightTrip> result = flightTripService.searchFlightTripsCombined(
                originCode, destinationCode, null, null, null);

        // Then
        assertEquals(expectedResults, result);
        verify(flightTripRepository, times(1))
                .findByOrigin_CodeAndDestination_Code(originCode, destinationCode);
    }

    @Test
    void searchFlightTripsCombined_WithOnlyCountries_ShouldCallCorrectRepositoryMethod() {
        // Given
        String originCountry = "USA";
        String destinationCountry = "UK";
        List<FlightTrip> expectedResults = Arrays.asList(flightTrip1);

        when(flightTripRepository.findByOrigin_CountryAndDestination_Country(originCountry, destinationCountry))
                .thenReturn(expectedResults);

        // When
        List<FlightTrip> result = flightTripService.searchFlightTripsCombined(
                null, null, originCountry, destinationCountry, null);

        // Then
        assertEquals(expectedResults, result);
        verify(flightTripRepository, times(1))
                .findByOrigin_CountryAndDestination_Country(originCountry, destinationCountry);
    }

    @Test
    void searchFlightTripsCombined_WithNoParameters_ShouldReturnAllFlightTrips() {
        // Given
        List<FlightTrip> expectedResults = Arrays.asList(flightTrip1, flightTrip2);

        when(flightTripRepository.findAll()).thenReturn(expectedResults);

        // When
        List<FlightTrip> result = flightTripService.searchFlightTripsCombined(
                null, null, null, null, null);

        // Then
        assertEquals(expectedResults, result);
        verify(flightTripRepository, times(1)).findAll();
    }

    @Test
    void searchFlightTripsWithAirportsAndDate_ShouldCallCorrectRepositoryMethod() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        LocalDateTime departureDate = LocalDateTime.of(2025, 6, 1, 10, 0);
        List<FlightTrip> expectedResults = Arrays.asList(flightTrip1);

        when(flightTripRepository.findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(
                eq(originCode), eq(destinationCode), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(expectedResults);

        // When
        List<FlightTrip> result = flightTripService.searchFlightTripsWithAirportsAndDate(
                originCode, destinationCode, departureDate);

        // Then
        assertEquals(expectedResults, result);
        verify(flightTripRepository, times(1))
                .findByOrigin_CodeAndDestination_CodeAndDepartureTimeBetween(
                        eq(originCode), eq(destinationCode), any(LocalDateTime.class), any(LocalDateTime.class));
    }
}
