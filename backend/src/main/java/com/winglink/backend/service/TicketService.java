package com.winglink.backend.service;

import com.winglink.backend.config.security.SecurityUtils;
import com.winglink.backend.dto.TicketDto;
import com.winglink.backend.dto.TicketDtoConverter;
import com.winglink.backend.dto.TicketResponseDto;
import com.winglink.backend.entity.AppUser;
import com.winglink.backend.entity.Flight;
import com.winglink.backend.entity.Ticket;
import com.winglink.backend.exception.Auth0UserNotFoundInDbException;
import com.winglink.backend.exception.FlightNotFoundException;
import com.winglink.backend.exception.FlightSeatLimitReached;
import com.winglink.backend.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final FlightService flightService;
    private final AppUserService appUserService;

    public TicketService(TicketRepository ticketRepository, FlightService flightService, AppUserService appUserService) {
        this.ticketRepository = ticketRepository;
        this.flightService = flightService;
        this.appUserService = appUserService;
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
        ticketRepository.deleteById(id);
    }

    public TicketResponseDto buyTicket(TicketDto ticketDto) {
        String auth0Id = SecurityUtils.getAuth0UserId();
        AppUser user = appUserService.getUserByAuth0Id(auth0Id).orElseThrow(Auth0UserNotFoundInDbException::new);
        Flight flight = flightService.findFlightById(ticketDto.flightId()).orElseThrow(FlightNotFoundException::new);
        if (!isUnderSeatLimit(flight)) throw new FlightSeatLimitReached();
        String firstName = ticketDto.firstName() == null ? user.getFirstName() : ticketDto.firstName();
        String lastName = ticketDto.lastName() == null ? user.getLastName() : ticketDto.lastName();
        Ticket ticket = new Ticket(null, firstName, lastName, ticketDto.seatClass(), flight, user);
        return TicketDtoConverter.convertToTicketDto(ticketRepository.save(ticket));
    }

    private boolean isUnderSeatLimit(Flight flight) {
        return getAmountOfReservedSeatsOnFlight(flight.getId()) < 150;
    }

    private int getAmountOfReservedSeatsOnFlight(Long flightId) {
        return ticketRepository.findAllByFlight_Id(flightId).size();
    }
}
