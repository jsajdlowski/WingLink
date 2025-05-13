package com.winglink.backend.repository;

import com.winglink.backend.entity.Airport;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findByCode(@NotBlank String code);
}