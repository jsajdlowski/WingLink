package com.winglink.backend.service;

import com.winglink.backend.entity.Airport;
import com.winglink.backend.repository.AirportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AirportServiceTest {

    @Mock
    private AirportRepository airportRepository;

    @InjectMocks
    private AirportService airportService;

    private Airport airport1;
    private Airport airport2;

    @BeforeEach
    void setUp() {
        airport1 = new Airport();
        airport1.setId(1L);
        airport1.setCode("JFK");
        airport1.setName("John F. Kennedy International Airport");
        airport1.setCountry("USA");
        airport1.setCity("New York");

        airport2 = new Airport();
        airport2.setId(2L);
        airport2.setCode("LHR");
        airport2.setName("London Heathrow Airport");
        airport2.setCountry("UK");
        airport2.setCity("London");
    }

    @Test
    void findAllFlights_ShouldReturnAllAirports() {
        // Given
        List<Airport> expectedAirports = Arrays.asList(airport1, airport2);
        when(airportRepository.findAll()).thenReturn(expectedAirports);

        // When
        List<Airport> actualAirports = airportService.findAllFlights();

        // Then
        assertEquals(2, actualAirports.size());
        assertEquals(expectedAirports, actualAirports);
        verify(airportRepository, times(1)).findAll();
    }

    @Test
    void findAirportById_WhenAirportExists_ShouldReturnAirport() {
        // Given
        Long airportId = 1L;
        when(airportRepository.findById(airportId)).thenReturn(Optional.of(airport1));

        // When
        Optional<Airport> result = airportService.findAirportById(airportId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(airport1, result.get());
        verify(airportRepository, times(1)).findById(airportId);
    }

    @Test
    void findAirportById_WhenAirportDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long airportId = 999L;
        when(airportRepository.findById(airportId)).thenReturn(Optional.empty());

        // When
        Optional<Airport> result = airportService.findAirportById(airportId);

        // Then
        assertFalse(result.isPresent());
        verify(airportRepository, times(1)).findById(airportId);
    }

    @Test
    void findAirportByCode_WhenAirportExists_ShouldReturnAirport() {
        // Given
        String airportCode = "JFK";
        when(airportRepository.findByCode(airportCode)).thenReturn(Optional.of(airport1));

        // When
        Optional<Airport> result = airportService.findAirportByCode(airportCode);

        // Then
        assertTrue(result.isPresent());
        assertEquals(airport1, result.get());
        verify(airportRepository, times(1)).findByCode(airportCode);
    }

    @Test
    void findAirportByCode_WhenAirportDoesNotExist_ShouldReturnEmpty() {
        // Given
        String airportCode = "ABC";
        when(airportRepository.findByCode(airportCode)).thenReturn(Optional.empty());

        // When
        Optional<Airport> result = airportService.findAirportByCode(airportCode);

        // Then
        assertFalse(result.isPresent());
        verify(airportRepository, times(1)).findByCode(airportCode);
    }

    @Test
    void saveAirport_ShouldReturnSavedAirport() {
        // Given
        when(airportRepository.save(any(Airport.class))).thenReturn(airport1);

        // When
        Airport result = airportService.saveAirport(airport1);

        // Then
        assertEquals(airport1, result);
        verify(airportRepository, times(1)).save(airport1);
    }

    @Test
    void deleteAirport_ShouldCallRepositoryDeleteById() {
        // Given
        Long airportId = 1L;

        // When
        airportService.deleteAirport(airportId);

        // Then
        verify(airportRepository, times(1)).deleteById(airportId);
    }
}
