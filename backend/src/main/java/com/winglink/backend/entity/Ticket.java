package com.winglink.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.winglink.backend.enums.SeatClass;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotBlank
    private String seat;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    private SeatClass seatClass;
    @NotNull
    @OneToOne(fetch = FetchType.EAGER)
    private Flight flight;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User boughtBy;
}