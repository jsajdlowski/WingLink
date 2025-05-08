package com.winglink.backend.controller;

import com.winglink.backend.entity.FlightTrip;
import com.winglink.backend.service.ExternalApiService;
import com.winglink.backend.service.FlightTripSearchService;
import com.winglink.backend.service.FlightTripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/flights")
public class FlightTripController {

    private final FlightTripService flightTripService;
    private final ExternalApiService externalApiService;
    private final FlightTripSearchService flightTripSearchService;

    public FlightTripController(FlightTripService flightTripService, ExternalApiService externalApiService, FlightTripSearchService flightTripSearchService) {
        this.flightTripService = flightTripService;
        this.externalApiService = externalApiService;
        this.flightTripSearchService = flightTripSearchService;
    }

    @GetMapping
    public List<FlightTrip> getAllFlightTrips() {
        return flightTripService.getAllFlightTrips();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightTrip> getFlightTripById(@PathVariable Long id) {
        Optional<FlightTrip> flightTrip = flightTripService.getFlightTripById(id);
        return flightTrip.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FlightTrip createFlight(@RequestBody FlightTrip flightTrip) {
        return flightTripService.createFlightTrip(flightTrip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlightTrip> updateFlightTrip(@PathVariable Long id, @RequestBody FlightTrip flightDetails) {
        Optional<FlightTrip> updatedFlight = flightTripService.updateFlightTrip(id, flightDetails);
        return updatedFlight.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlightTrip(@PathVariable Long id) {
        flightTripService.deleteFlightTrip(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<FlightTrip> searchFlightTrips(@RequestParam(required = true) String origin,
                                      @RequestParam(required = true) String destination,
//                                      @RequestParam(required = false) String originCountry,
//                                      @RequestParam(required = false) String destinationCountry,
                                      @RequestParam(required = false) String date) {
        LocalDateTime departureDate = date != null ? LocalDateTime.parse(date) : LocalDateTime.now();
        return flightTripSearchService.searchFlightTrips(origin, destination, departureDate);
    }

//    @GetMapping("/fetchfromapi")
//    public List<FlightTrip> fetchFlightsFromApi() {
//        return externalApiService.getFlightTripsTest();
//    }
}
