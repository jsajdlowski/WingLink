package com.winglink.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "flight_trip")
public class FlightTrip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "origin_id", nullable = false)
    private Airport origin;
    //    @NotNull
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    private Airport destination;
//    @OneToMany(mappedBy = "flight_trip", fetch = FetchType.LAZY)
//    @JsonManagedReference(value = "flight-ticket")
//    private List<Ticket> tickets;
    @NotNull
    private LocalDateTime departureTime;
    @NotNull
    private LocalDateTime arrivalTime;
    @NotNull
    @Min(value = 1, message = "Price must be at least 1")
    private BigDecimal price;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
//    @JsonManagedReference(value = "flights")
    private List<Flight> flights;

}