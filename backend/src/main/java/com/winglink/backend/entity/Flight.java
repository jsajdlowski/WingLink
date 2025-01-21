package com.winglink.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightNumber;

    @ManyToOne
    @JoinColumn(name = "origin_id", nullable = false)
    private Airport origin;

    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Airport destination;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String airline;
    private BigDecimal price;

}