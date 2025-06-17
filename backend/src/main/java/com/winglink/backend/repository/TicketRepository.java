package com.winglink.backend.repository;

import com.winglink.backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByFlightTrip_Id(Long flightTripId);
}