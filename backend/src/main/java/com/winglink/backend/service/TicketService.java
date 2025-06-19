package com.winglink.backend.service;

import com.winglink.backend.config.security.SecurityUtils;
import com.winglink.backend.dto.TicketDto;
import com.winglink.backend.dto.TicketDtoConverter;
import com.winglink.backend.dto.TicketResponseDto;
import com.winglink.backend.entity.AppUser;
import com.winglink.backend.entity.Flight;
import com.winglink.backend.entity.FlightTrip;
import com.winglink.backend.entity.Ticket;
import com.winglink.backend.exception.Auth0UserNotFoundInDbException;
import com.winglink.backend.exception.FlightNotFoundException;
import com.winglink.backend.exception.FlightSeatLimitReached;
import com.winglink.backend.repository.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final AppUserService appUserService;
    private final FlightTripService flightTripService;

    public TicketService(TicketRepository ticketRepository, AppUserService appUserService, FlightTripService flightTripService) {
        this.ticketRepository = ticketRepository;
        this.appUserService = appUserService;
        this.flightTripService = flightTripService;
    }

    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Optional<TicketResponseDto> findById(Long id) {
        return ticketRepository.findById(id).map(TicketDtoConverter::convertToTicketDto);
    }

    public List<TicketResponseDto> findAll() {
        return ticketRepository.findAll().stream().map(TicketDtoConverter::convertToTicketDto).toList();
    }

    public void deleteById(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Ticket not found"));
        AppUser user = ticket.getBoughtBy();
        user.getTickets().remove(ticket);
        ticketRepository.deleteById(id);
    }

    public TicketResponseDto buyTicket(TicketDto ticketDto) {
        String auth0Id = SecurityUtils.getAuth0UserId();
        AppUser user = appUserService.getUserByAuth0Id(auth0Id).orElseThrow(Auth0UserNotFoundInDbException::new);
        FlightTrip flightTrip = flightTripService.getFlightTripById(ticketDto.flightId()).orElseThrow(FlightNotFoundException::new);
        flightTrip.getFlights().forEach(flight -> {
            if (!isUnderSeatLimit(flight)) throw new FlightSeatLimitReached();
        });
        String firstName = ticketDto.firstName() == null ? user.getFirstName() : ticketDto.firstName();
        String lastName = ticketDto.lastName() == null ? user.getLastName() : ticketDto.lastName();
        Ticket ticket = new Ticket(null, firstName, lastName, ticketDto.seatClass(), flightTrip, user);
        return TicketDtoConverter.convertToTicketDto(ticketRepository.save(ticket));
    }

    private boolean isUnderSeatLimit(Flight flight) {
        return getAmountOfReservedSeatsOnFlight(flight.getId()) < 150;
    }

    private int getAmountOfReservedSeatsOnFlight(Long flightId) {
        return ticketRepository.findAllByFlightTrip_Id(flightId).size();
    }
}
