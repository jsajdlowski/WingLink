package com.winglink.backend.service;

import com.winglink.backend.dto.googleflightsapi.GoogleFlightsFlightDto;
import com.winglink.backend.dto.googleflightsapi.GoogleFlightsResponseDto;
import com.winglink.backend.entity.Flight;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class ExternalApiService {
    @Value("externalapi.url")
    private String apiUrl;

    @Value("externalapi.url")
    private String apiKey;

    @Value("externalapi.host")
    private String apiHost;

    private RestTemplate restTemplate;
    private FlightService flightService;
    private FlightDtoConverterService flightDtoConverterService;

    public ExternalApiService(RestTemplate restTemplate, FlightService flightService, FlightDtoConverterService flightDtoConverterService) {
        this.restTemplate = restTemplate;
        this.flightService = flightService;
        this.flightDtoConverterService = flightDtoConverterService;
    }

    public List<Flight> getFlights() {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("origin", "JFK") // test data
                .queryParam("destination", "LHR")
                .queryParam("date", "2025-02-01");

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

        List<GoogleFlightsFlightDto> topFlights = response.getBody().data().topFlights();

        List<Flight> flights = topFlights.stream().map(flightDto -> flightDtoConverterService.convertToEntity(flightDto)).toList();
        flights.forEach(flight -> {flightService.createFlight(flight);});

        return flights;
    }


}
