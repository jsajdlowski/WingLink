package com.winglink.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String flightNumber;
    @NotBlank
    @ManyToOne
    @JoinColumn(name = "origin_id", nullable = false)
    private Airport origin;
    @NotBlank
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Airport destination;
    @NotBlank
    @OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "flight-ticket")
    private List<Ticket> tickets;
    @NotBlank
    private LocalDateTime departureTime;
    @NotBlank
    private LocalDateTime arrivalTime;
    @NotBlank
    private String airline;
    @NotNull
    @Min(value = 1, message = "Price must be at least 1")
    private BigDecimal price;
}