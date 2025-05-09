package com.winglink.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String flightNumber;
    @ManyToOne
    @JoinColumn(name = "origin_id", nullable = false)
    private Airport origin;
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Airport destination;
    @NotNull
    private LocalDateTime departureTime;
    @NotNull
    private LocalDateTime arrivalTime;
    @NotNull
    private String airline;
    private String airlineLogo;
}