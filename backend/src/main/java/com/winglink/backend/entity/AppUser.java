package com.winglink.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.winglink.backend.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "First name is mandatory")
    private String firstName;
    @NotBlank(message = "Last name is mandatory")
    private String lastName;
    @NotBlank(message = "E-mail is mandatory")
    @Email(message = "Incorrect e-mail format")
    private String email;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "boughtBy", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "user-ticket")
    private List<Ticket> tickets;
}