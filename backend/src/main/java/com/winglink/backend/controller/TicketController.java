package com.winglink.backend.controller;

import com.winglink.backend.dto.TicketDto;
import com.winglink.backend.dto.TicketResponseDto;
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
    public ResponseEntity<List<TicketResponseDto>> getTickets() {
        List<TicketResponseDto> tickets = ticketService.findAll();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/my")
    public ResponseEntity<List<TicketResponseDto>> getMyTickets() {
        List<TicketResponseDto> tickets = appUserService.findUserTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/my/{id}")
    public ResponseEntity<TicketResponseDto> getMyTicketById(@PathVariable int id) {
        return appUserService.findUserTicketById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TicketResponseDto> addTicket(@RequestBody TicketDto ticketDto) {
        TicketResponseDto ticketSaved = ticketService.buyTicket(ticketDto);
        return new ResponseEntity<>(ticketSaved, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDto> getTicket(@PathVariable long id) {
        return ticketService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable long id) {
        ticketService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
