package com.winglink.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.winglink.backend.enums.SeatClass;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TicketDto(@NotNull Long flightId, @NotNull SeatClass seatClass, String firstName,
                        String lastName) implements Serializable {
}