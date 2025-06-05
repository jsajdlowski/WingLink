package com.winglink.backend.service;

import com.winglink.backend.entity.FlightTrip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightTripSearchServiceTest {

    @Mock
    private ExternalApiService externalApiService;

    @Mock
    private FlightTripService flightTripService;

    @InjectMocks
    private FlightTripSearchService flightTripSearchService;

    private FlightTrip flightTrip1;
    private FlightTrip flightTrip2;

    @BeforeEach
    void setUp() {
        flightTrip1 = new FlightTrip();
        flightTrip1.setId(1L);

        flightTrip2 = new FlightTrip();
        flightTrip2.setId(2L);
    }

    @Test
    void searchFlightTrips_WhenCachedFlightTripsExist_ShouldReturnCachedResults() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        LocalDateTime departureDate = LocalDateTime.of(2025, 6, 1, 10, 0);
        List<FlightTrip> cachedFlightTrips = Arrays.asList(flightTrip1, flightTrip2);

        when(flightTripService.searchFlightTripsWithAirportsAndDate(originCode, destinationCode, departureDate))
                .thenReturn(cachedFlightTrips);

        // When
        List<FlightTrip> result = flightTripSearchService.searchFlightTrips(originCode, destinationCode, departureDate);

        // Then
        assertEquals(cachedFlightTrips, result);
        verify(flightTripService, times(1))
                .searchFlightTripsWithAirportsAndDate(originCode, destinationCode, departureDate);
        verify(externalApiService, never())
                .getFlightTrips(anyString(), anyString(), any(LocalDateTime.class));
    }

    @Test
    void searchFlightTrips_WhenCachedResultsIsNull_ShouldThrowNullPointerException() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        LocalDateTime date = LocalDateTime.of(2025, 6, 1, 10, 0);

        when(flightTripService.searchFlightTripsWithAirportsAndDate(originCode, destinationCode, date))
                .thenReturn(null);

        // When & Then
        assertThrows(NullPointerException.class, () -> {
            flightTripSearchService.searchFlightTrips(originCode, destinationCode, date);
        });

        verify(flightTripService, times(1))
                .searchFlightTripsWithAirportsAndDate(originCode, destinationCode, date);
        verify(externalApiService, never())
                .getFlightTrips(anyString(), anyString(), any(LocalDateTime.class));
    }

    @Test
    void searchFlightTrips_WhenNoCachedFlightTripsExist_ShouldCallExternalApiService() {
        // Given
        String originCode = "JFK";
        String destinationCode = "LHR";
        LocalDateTime departureDate = LocalDateTime.of(2025, 6, 1, 10, 0);
        List<FlightTrip> externalApiResults = Arrays.asList(flightTrip1, flightTrip2);

        when(flightTripService.searchFlightTripsWithAirportsAndDate(originCode, destinationCode, departureDate))
                .thenReturn(Collections.emptyList());
        when(externalApiService.getFlightTrips(originCode, destinationCode, departureDate))
                .thenReturn(externalApiResults);

        // When
        List<FlightTrip> result = flightTripSearchService.searchFlightTrips(originCode, destinationCode, departureDate);

        // Then
        assertEquals(externalApiResults, result);
        verify(flightTripService, times(1))
                .searchFlightTripsWithAirportsAndDate(originCode, destinationCode, departureDate);
        verify(externalApiService, times(1))
                .getFlightTrips(originCode, destinationCode, departureDate);
    }
}
