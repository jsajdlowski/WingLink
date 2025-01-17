package com.winglink.backend.repository;

import com.winglink.backend.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AirportRepository extends JpaRepository<Airport, Long> {
}