package com.winglink.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.winglink.backend.enums.SeatClass;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    @Enumerated(EnumType.STRING)
    private SeatClass seatClass;
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flight_trip_id", nullable = false)
    @JsonBackReference(value = "flight-ticket")
    private FlightTrip flightTrip;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", nullable = false)
    @JsonBackReference(value = "user-ticket")
    private AppUser boughtBy;
}