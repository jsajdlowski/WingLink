package com.winglink.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class FlightSeatLimitReached extends RuntimeException {
    public FlightSeatLimitReached() {
        super("Flight Seat Limit Reached");
    }
}
