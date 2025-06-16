package com.winglink.backend.service;

import com.winglink.backend.dto.TicketDtoConverter;
import com.winglink.backend.dto.TicketResponseDto;
import com.winglink.backend.entity.Ticket;
import com.winglink.backend.repository.TicketRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    private Ticket ticket1;
    private Ticket ticket2;
    private TicketResponseDto ticket1ResponseDto;
    private TicketResponseDto ticket2ResponseDto;

    @BeforeEach
    void setUp() {
        ticket1 = new Ticket();
        ticket1.setId(1L);
        ticket1ResponseDto = TicketDtoConverter.convertToTicketDto(ticket1);

        ticket2 = new Ticket();
        ticket2.setId(2L);
        ticket2ResponseDto = TicketDtoConverter.convertToTicketDto(ticket2);
    }

    @Test
    void save_ShouldReturnSavedTicket() {
        // Given
        when(ticketRepository.save(any(Ticket.class))).thenReturn(ticket1);

        // When
        Ticket result = ticketService.save(ticket1);

        // Then
        assertEquals(ticket1, result);
        verify(ticketRepository, times(1)).save(ticket1);
    }

    @Test
    void findById_WhenTicketExists_ShouldReturnTicket() {
        // Given
        Long ticketId = 1L;
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(ticket1));

        // When
        Optional<TicketResponseDto> result = ticketService.findById(ticketId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(ticket1ResponseDto, result.get());
        verify(ticketRepository, times(1)).findById(ticketId);
    }

    @Test
    void findById_WhenTicketDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long ticketId = 999L;
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.empty());

        // When
        Optional<TicketResponseDto> result = ticketService.findById(ticketId);

        // Then
        assertFalse(result.isPresent());
        verify(ticketRepository, times(1)).findById(ticketId);
    }

    @Test
    void findAll_ShouldReturnAllTickets() {
        // Given
        List<Ticket> expectedTickets = Arrays.asList(ticket1, ticket2);
        List<TicketResponseDto> expectedTicketDtos = Arrays.asList(ticket1ResponseDto, ticket2ResponseDto);
        when(ticketRepository.findAll()).thenReturn(expectedTickets);

        // When
        List<TicketResponseDto> actualTickets = ticketService.findAll();

        // Then
        assertEquals(2, actualTickets.size());
        assertEquals(expectedTicketDtos, actualTickets);
        verify(ticketRepository, times(1)).findAll();
    }

    @Test
    void deleteById_ShouldCallRepositoryDeleteById() {
        // Given
        Long ticketId = 1L;

        // When
        ticketService.deleteById(ticketId);

        // Then
        verify(ticketRepository, times(1)).deleteById(ticketId);
    }
}
