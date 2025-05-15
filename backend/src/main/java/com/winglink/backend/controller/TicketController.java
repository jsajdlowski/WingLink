package com.winglink.backend.controller;

import com.winglink.backend.dto.TicketDto;
import com.winglink.backend.entity.Ticket;
import com.winglink.backend.service.AppUserService;
import com.winglink.backend.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;
    private final AppUserService appUserService;

    public TicketController(TicketService ticketService, AppUserService appUserService) {
        this.ticketService = ticketService;
        this.appUserService = appUserService;
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getTickets() {
        List<Ticket> tickets = ticketService.findAll();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Ticket>> getMyTickets() {
        List<Ticket> tickets = appUserService.findUserTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/my/{id}")
    public ResponseEntity<Ticket> getMyTicketById(@PathVariable int id) {
        return appUserService.findUserTicketById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ticket> addTicket(@RequestBody TicketDto ticketDto) {
        Ticket ticketSaved = ticketService.buyTicket(ticketDto);
        return new ResponseEntity<>(ticketSaved,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicket(@PathVariable long id) {
        return ticketService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable long id) {
        ticketService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
