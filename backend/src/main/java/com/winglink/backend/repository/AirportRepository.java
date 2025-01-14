package com.example.backend.repository;

import com.example.backend.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AirportRepository extends JpaRepository<Airport, Long> {
}