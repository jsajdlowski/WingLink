package com.winglink.backend.service;

import com.winglink.backend.dto.googleflightsapi.GoogleFlightsFlightDto;
import com.winglink.backend.dto.googleflightsapi.GoogleFlightsResponseDto;
import com.winglink.backend.entity.FlightTrip;
import com.winglink.backend.exception.ExternalApiEmptyBodyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ExternalApiService {
    @Value("${externalapi.url}")
    private String apiUrl;

    @Value("${externalapi.api_key}")
    private String apiKey;

    @Value("${externalapi.host}")
    private String apiHost;

    private RestTemplate restTemplate;
    private FlightTripService flightTripService;
    private FlightDtoConverterService flightDtoConverterService;

    public ExternalApiService(RestTemplate restTemplate, FlightTripService flightTripService, FlightDtoConverterService flightDtoConverterService) {
        this.restTemplate = restTemplate;
        this.flightTripService = flightTripService;
        this.flightDtoConverterService = flightDtoConverterService;
    }

    public List<FlightTrip> getFlightTripsTest() {
        System.out.println(apiUrl);
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("origin", "JFK") // test data
                .queryParam("destination", "LHR")
                .queryParam("date", "2025-02-01");

        String urlWithParams = builder.toUriString();

        System.out.println(urlWithParams);

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", apiHost);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<GoogleFlightsResponseDto> response = restTemplate.exchange(
                urlWithParams,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<GoogleFlightsResponseDto>() {}
        );

        assert response.getBody() != null;
        List<GoogleFlightsFlightDto> topFlights = response.getBody().data().itineraries().topFlights();
        List<GoogleFlightsFlightDto> otherFlights = response.getBody().data().itineraries().otherFlights();

        // TODO: include otherFlights as well
        List<FlightTrip> flightTrips = topFlights.stream().map(flightDto -> flightDtoConverterService.convertToEntity(flightDto)).toList();
        flightTrips.forEach(flightTrip -> flightTripService.createFlightTrip(flightTrip));

        return flightTrips;
    }

    public List<FlightTrip> getFlightTrips(String originAirport, String destinationAirport, LocalDateTime date) {
        String dateString = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(date);
        System.out.println(apiUrl);
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("departure_id", originAirport) // test data
                .queryParam("arrival_id", destinationAirport)
                .queryParam("outbound_date", dateString)
                .queryParam("currency", "PLN")
                .queryParam("country_code", "PL");

        String urlWithParams = builder.toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", apiHost);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<GoogleFlightsResponseDto> response = restTemplate.exchange(
                urlWithParams,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<GoogleFlightsResponseDto>() {}
        );

        if (response.getBody() == null) throw new ExternalApiEmptyBodyException();
        if (response.getBody().data().itineraries().topFlights().isEmpty() && response.getBody().data().itineraries().otherFlights().isEmpty()) {
            return List.of();
        }
        List<GoogleFlightsFlightDto> topFlights = response.getBody().data().itineraries().topFlights();
        List<GoogleFlightsFlightDto> otherFlights = response.getBody().data().itineraries().otherFlights();

        List<FlightTrip> combinedFlightTrips = Stream.concat(
                topFlights.stream().map(flightDto -> flightDtoConverterService.convertToEntity(flightDto)),
                otherFlights.stream().map(flightDto -> flightDtoConverterService.convertToEntity(flightDto))
        ).toList();

        combinedFlightTrips.forEach(flightTrip -> flightTripService.createFlightTrip(flightTrip));

        return combinedFlightTrips;
    }
}
