package com.winglink.backend.service;

import com.winglink.backend.entity.Flight;
import com.winglink.backend.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightServiceTest {

    @Mock
    private FlightRepository flightRepository;

    @InjectMocks
    private FlightService flightService;

    private Flight flight1;
    private Flight flight2;

    @BeforeEach
    void setUp() {
        flight1 = new Flight();
        flight1.setId(1L);
        flight1.setFlightNumber("AA123");
        flight1.setAirline("American Airlines");
        flight1.setAirlineLogo("aa_logo.png");
        flight1.setDepartureTime(LocalDateTime.of(2025, 6, 1, 10, 0));
        flight1.setArrivalTime(LocalDateTime.of(2025, 6, 1, 14, 0));

        flight2 = new Flight();
        flight2.setId(2L);
        flight2.setFlightNumber("BA456");
        flight2.setAirline("British Airways");
        flight2.setAirlineLogo("ba_logo.png");
        flight2.setDepartureTime(LocalDateTime.of(2025, 6, 2, 9, 0));
        flight2.setArrivalTime(LocalDateTime.of(2025, 6, 2, 13, 30));
    }

    @Test
    void findAllFlights_ShouldReturnAllFlights() {
        // Given
        List<Flight> expectedFlights = Arrays.asList(flight1, flight2);
        when(flightRepository.findAll()).thenReturn(expectedFlights);

        // When
        List<Flight> actualFlights = flightService.findAllFlights();

        // Then
        assertEquals(2, actualFlights.size());
        assertEquals(expectedFlights, actualFlights);
        verify(flightRepository, times(1)).findAll();
    }

    @Test
    void findFlightById_WhenFlightExists_ShouldReturnFlight() {
        // Given
        Long flightId = 1L;
        when(flightRepository.findById(flightId)).thenReturn(Optional.of(flight1));

        // When
        Optional<Flight> result = flightService.findFlightById(flightId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(flight1, result.get());
        verify(flightRepository, times(1)).findById(flightId);
    }

    @Test
    void findFlightById_WhenFlightDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long flightId = 999L;
        when(flightRepository.findById(flightId)).thenReturn(Optional.empty());

        // When
        Optional<Flight> result = flightService.findFlightById(flightId);

        // Then
        assertFalse(result.isPresent());
        verify(flightRepository, times(1)).findById(flightId);
    }

    @Test
    void findFlightByNumber_WhenFlightExists_ShouldReturnFlight() {
        // Given
        String flightNumber = "AA123";
        when(flightRepository.findFirstByFlightNumber(flightNumber)).thenReturn(Optional.of(flight1));

        // When
        Optional<Flight> result = flightService.findFlightByNumber(flightNumber);

        // Then
        assertTrue(result.isPresent());
        assertEquals(flight1, result.get());
        verify(flightRepository, times(1)).findFirstByFlightNumber(flightNumber);
    }

    @Test
    void findFlightByNumber_WhenFlightDoesNotExist_ShouldReturnEmpty() {
        // Given
        String flightNumber = "XX999";
        when(flightRepository.findFirstByFlightNumber(flightNumber)).thenReturn(Optional.empty());

        // When
        Optional<Flight> result = flightService.findFlightByNumber(flightNumber);

        // Then
        assertFalse(result.isPresent());
        verify(flightRepository, times(1)).findFirstByFlightNumber(flightNumber);
    }

    @Test
    void saveFlight_ShouldReturnSavedFlight() {
        // Given
        when(flightRepository.save(any(Flight.class))).thenReturn(flight1);

        // When
        Flight result = flightService.saveFlight(flight1);

        // Then
        assertEquals(flight1, result);
        verify(flightRepository, times(1)).save(flight1);
    }

    @Test
    void deleteFlight_ShouldCallRepositoryDeleteById() {
        // Given
        Long flightId = 1L;

        // When
        flightService.deleteFlight(flightId);

        // Then
        verify(flightRepository, times(1)).deleteById(flightId);
    }
}
