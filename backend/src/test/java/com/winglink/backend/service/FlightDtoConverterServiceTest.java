package com.winglink.backend.service;

import com.winglink.backend.dto.googleflightsapi.GoogleFlightsFlightDto;
import com.winglink.backend.dto.googleflightsapi.SingleFlightAirportDto;
import com.winglink.backend.dto.googleflightsapi.SingleFlightDetail;
import com.winglink.backend.entity.Airport;
import com.winglink.backend.entity.Flight;
import com.winglink.backend.entity.FlightTrip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightDtoConverterServiceTest {

    @Mock
    private AirportService airportService;

    @Mock
    private FlightService flightService;

    @InjectMocks
    private FlightDtoConverterService flightDtoConverterService;

    private Airport originAirport;
    private Airport destinationAirport;
    private GoogleFlightsFlightDto googleFlightsFlightDto;
    private SingleFlightDetail singleFlightDetail;
    private Flight existingFlight;

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

        SingleFlightAirportDto departureAirportDto = new SingleFlightAirportDto(
                "John F. Kennedy International Airport", "JFK", "2025-6-1 10:00");
        SingleFlightAirportDto arrivalAirportDto = new SingleFlightAirportDto(
                "London Heathrow Airport", "LHR", "2025-6-1 18:00");

        singleFlightDetail = new SingleFlightDetail(
                departureAirportDto,
                arrivalAirportDto,
                "American Airlines",
                "aa_logo.png",
                "AA123"
        );

        googleFlightsFlightDto = new GoogleFlightsFlightDto(
                "01-06-2025 10:00 AM",
                "01-06-2025 06:00 PM",
                Arrays.asList(singleFlightDetail),
                new BigDecimal("599.99")
        );

        existingFlight = new Flight();
        existingFlight.setId(1L);
        existingFlight.setFlightNumber("AA123");
        existingFlight.setAirline("American Airlines");
        existingFlight.setAirlineLogo("aa_logo.png");
        existingFlight.setOrigin(originAirport);
        existingFlight.setDestination(destinationAirport);
        existingFlight.setDepartureTime(LocalDateTime.of(2025, 6, 1, 10, 0));
        existingFlight.setArrivalTime(LocalDateTime.of(2025, 6, 1, 18, 0));
    }

    @Test
    void convertToEntity_ShouldConvertGoogleFlightsFlightDtoToFlightTrip() {
        // Given
        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.of(originAirport));
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.of(destinationAirport));
        when(flightService.findFlightByNumber("AA123")).thenReturn(Optional.of(existingFlight));

        // When
        FlightTrip result = flightDtoConverterService.convertToEntity(googleFlightsFlightDto);

        // Then
        assertNotNull(result);
        assertEquals(LocalDateTime.of(2025, 6, 1, 10, 0), result.getDepartureTime());
        assertEquals(LocalDateTime.of(2025, 6, 1, 18, 0), result.getArrivalTime());
        assertEquals(originAirport, result.getOrigin());
        assertEquals(destinationAirport, result.getDestination());
        assertEquals(new BigDecimal("599.99"), result.getPrice());
        assertEquals(1, result.getFlights().size());
        assertEquals(existingFlight, result.getFlights().getFirst());

        verify(airportService, times(2)).findAirportByCode("JFK");
        verify(airportService, times(2)).findAirportByCode("LHR");
        verify(flightService, times(1)).findFlightByNumber("AA123");
    }

    @Test
    void convertToEntity_WhenAirportsNotFound_ShouldSetNullAirports() {
        // Given
        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.empty());
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.empty());
        when(flightService.findFlightByNumber("AA123")).thenReturn(Optional.of(existingFlight));

        // When
        FlightTrip result = flightDtoConverterService.convertToEntity(googleFlightsFlightDto);

        // Then
        assertNotNull(result);
        assertNull(result.getOrigin());
        assertNull(result.getDestination());
        assertEquals(new BigDecimal("599.99"), result.getPrice());
        assertEquals(1, result.getFlights().size());

        verify(airportService, times(2)).findAirportByCode("JFK");
        verify(airportService, times(2)).findAirportByCode("LHR");
    }

    @Test
    void convertToEntity_WhenFlightNotFound_ShouldCreateNewFlight() {
        // Given
        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.of(originAirport));
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.of(destinationAirport));
        when(flightService.findFlightByNumber("AA123")).thenReturn(Optional.empty());

        // When
        FlightTrip result = flightDtoConverterService.convertToEntity(googleFlightsFlightDto);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getFlights().size());

        Flight convertedFlight = result.getFlights().getFirst();
        assertEquals("AA123", convertedFlight.getFlightNumber());
        assertEquals("American Airlines", convertedFlight.getAirline());
        assertEquals("aa_logo.png", convertedFlight.getAirlineLogo());
        assertEquals(originAirport, convertedFlight.getOrigin());
        assertEquals(destinationAirport, convertedFlight.getDestination());

        verify(flightService, times(1)).findFlightByNumber("AA123");
    }

    @Test
    void convertSingleFlightToEntity_ShouldConvertSingleFlightDetailToFlight() {
        // Given
        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.of(originAirport));
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.of(destinationAirport));

        // When
        Flight result = flightDtoConverterService.convertSingleFlightToEntity(singleFlightDetail);

        // Then
        assertNotNull(result);
        assertEquals("AA123", result.getFlightNumber());
        assertEquals("American Airlines", result.getAirline());
        assertEquals("aa_logo.png", result.getAirlineLogo());
        assertEquals(originAirport, result.getOrigin());
        assertEquals(destinationAirport, result.getDestination());
        assertEquals(LocalDateTime.of(2025, 6, 1, 10, 0), result.getDepartureTime());
        assertEquals(LocalDateTime.of(2025, 6, 1, 18, 0), result.getArrivalTime());

        verify(airportService, times(1)).findAirportByCode("JFK");
        verify(airportService, times(1)).findAirportByCode("LHR");
    }

    @Test
    void convertSingleFlightToEntity_WhenAirportsNotFound_ShouldSetNullAirports() {
        // Given
        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.empty());
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.empty());

        // When
        Flight result = flightDtoConverterService.convertSingleFlightToEntity(singleFlightDetail);

        // Then
        assertNotNull(result);
        assertEquals("AA123", result.getFlightNumber());
        assertEquals("American Airlines", result.getAirline());
        assertEquals("aa_logo.png", result.getAirlineLogo());
        assertNull(result.getOrigin());
        assertNull(result.getDestination());

        verify(airportService, times(1)).findAirportByCode("JFK");
        verify(airportService, times(1)).findAirportByCode("LHR");
    }

    @Test
    void convertToEntity_WithMultipleFlights_ShouldHandleAllFlights() {
        // Given
        SingleFlightAirportDto intermediateAirportDto = new SingleFlightAirportDto(
                "Dublin Airport", "DUB", "2025-6-1 14:00");
        SingleFlightAirportDto finalAirportDto = new SingleFlightAirportDto(
                "London Heathrow Airport", "LHR", "2025-6-1 18:00");

        SingleFlightDetail secondFlight = new SingleFlightDetail(
                intermediateAirportDto,
                finalAirportDto,
                "Aer Lingus",
                "ei_logo.png",
                "EI456"
        );

        GoogleFlightsFlightDto multiFlightDto = new GoogleFlightsFlightDto(
                "01-06-2025 10:00 AM",
                "01-06-2025 06:00 PM",
                Arrays.asList(singleFlightDetail, secondFlight),
                new BigDecimal("799.99")
        );

        Flight secondExistingFlight = new Flight();
        secondExistingFlight.setFlightNumber("EI456");

        when(airportService.findAirportByCode("JFK")).thenReturn(Optional.of(originAirport));
        when(airportService.findAirportByCode("LHR")).thenReturn(Optional.of(destinationAirport));
        when(flightService.findFlightByNumber("AA123")).thenReturn(Optional.of(existingFlight));
        when(flightService.findFlightByNumber("EI456")).thenReturn(Optional.of(secondExistingFlight));

        // When
        FlightTrip result = flightDtoConverterService.convertToEntity(multiFlightDto);

        // Then
        assertNotNull(result);
        assertEquals(2, result.getFlights().size());
        assertEquals(existingFlight, result.getFlights().get(0));
        assertEquals(secondExistingFlight, result.getFlights().get(1));

        verify(flightService, times(1)).findFlightByNumber("AA123");
        verify(flightService, times(1)).findFlightByNumber("EI456");
    }
}
