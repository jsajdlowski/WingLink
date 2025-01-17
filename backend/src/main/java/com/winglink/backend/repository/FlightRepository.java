package com.winglink.backend.repository;

import com.winglink.backend.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
