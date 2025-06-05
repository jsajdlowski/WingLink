package com.winglink.backend.service;

import com.winglink.backend.entity.AppUser;
import com.winglink.backend.enums.UserRole;
import com.winglink.backend.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppUserServiceTest {

    @Mock
    private AppUserRepository userRepository;

    @InjectMocks
    private AppUserService appUserService;

    private AppUser user1;
    private AppUser user2;

    @BeforeEach
    void setUp() {
        user1 = new AppUser();
        user1.setId(1L);
        user1.setAuth0Id("auth0|123456789");
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setEmail("john.doe@example.com");
        user1.setRole(UserRole.NORMAL);
        user1.setTickets(Collections.emptyList());

        user2 = new AppUser();
        user2.setId(2L);
        user2.setAuth0Id("auth0|987654321");
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setEmail("jane.smith@example.com");
        user2.setRole(UserRole.NORMAL);
        user2.setTickets(Collections.emptyList());
    }

    @Test
    void save_ShouldSetDefaultRoleAndEmptyTicketsAndReturnSavedUser() {
        // Given
        AppUser newUser = new AppUser();
        newUser.setAuth0Id("auth0|newuser");
        newUser.setFirstName("New");
        newUser.setLastName("User");
        newUser.setEmail("new.user@example.com");

        when(userRepository.save(any(AppUser.class))).thenReturn(user1);

        // When
        AppUser result = appUserService.save(newUser);

        // Then
        assertEquals(UserRole.NORMAL, newUser.getRole());
        assertEquals(Collections.emptyList(), newUser.getTickets());
        assertEquals(user1, result);
        verify(userRepository, times(1)).save(newUser);
    }

    @Test
    void getOrCreateUser_WhenUserExists_ShouldReturnExistingUser() {
        // Given
        String auth0Id = "auth0|123456789";
        String firstName = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";

        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.of(user1));

        // When
        AppUser result = appUserService.getOrCreateUser(auth0Id, firstName, lastName, email);

        // Then
        assertEquals(user1, result);
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
        verify(userRepository, never()).save(any(AppUser.class));
    }

    @Test
    void getOrCreateUser_WhenUserDoesNotExist_ShouldCreateAndReturnNewUser() {
        // Given
        String auth0Id = "auth0|newuser";
        String firstName = "New";
        String lastName = "User";
        String email = "new.user@example.com";

        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.empty());
        when(userRepository.save(any(AppUser.class))).thenReturn(user2);

        // When
        AppUser result = appUserService.getOrCreateUser(auth0Id, firstName, lastName, email);

        // Then
        assertEquals(user2, result);
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
        verify(userRepository, times(1)).save(any(AppUser.class));
    }

    @Test
    void getUserByAuth0Id_WhenUserExists_ShouldReturnUser() {
        // Given
        String auth0Id = "auth0|123456789";
        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.of(user1));

        // When
        Optional<AppUser> result = appUserService.getUserByAuth0Id(auth0Id);

        // Then
        assertTrue(result.isPresent());
        assertEquals(user1, result.get());
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
    }

    @Test
    void getUserByAuth0Id_WhenUserDoesNotExist_ShouldReturnEmpty() {
        // Given
        String auth0Id = "auth0|nonexistent";
        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.empty());

        // When
        Optional<AppUser> result = appUserService.getUserByAuth0Id(auth0Id);

        // Then
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
    }

    @Test
    void findById_WhenUserExists_ShouldReturnUser() {
        // Given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(user1));

        // When
        Optional<AppUser> result = appUserService.findById(userId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(user1, result.get());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void findById_WhenUserDoesNotExist_ShouldReturnEmpty() {
        // Given
        Long userId = 999L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When
        Optional<AppUser> result = appUserService.findById(userId);

        // Then
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void findAll_ShouldReturnAllUsers() {
        // Given
        List<AppUser> expectedUsers = Arrays.asList(user1, user2);
        when(userRepository.findAll()).thenReturn(expectedUsers);

        // When
        List<AppUser> actualUsers = appUserService.findAll();

        // Then
        assertEquals(2, actualUsers.size());
        assertEquals(expectedUsers, actualUsers);
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void updateUserNamesByAuth0Id_WhenUserExists_ShouldUpdateAndReturnUser() {
        // Given
        String auth0Id = "auth0|123456789";
        String newFirstName = "UpdatedJohn";
        String newLastName = "UpdatedDoe";

        AppUser updatedUser = new AppUser();
        updatedUser.setId(1L);
        updatedUser.setAuth0Id(auth0Id);
        updatedUser.setFirstName(newFirstName);
        updatedUser.setLastName(newLastName);
        updatedUser.setEmail("john.doe@example.com");

        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.of(user1));
        when(userRepository.save(any(AppUser.class))).thenReturn(updatedUser);

        // When
        Optional<AppUser> result = appUserService.updateUserNamesByAuth0Id(auth0Id, newFirstName, newLastName);

        // Then
        assertTrue(result.isPresent());
        assertEquals(newFirstName, result.get().getFirstName());
        assertEquals(newLastName, result.get().getLastName());
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
        verify(userRepository, times(1)).save(user1);
    }

    @Test
    void updateUserNamesByAuth0Id_WhenUserDoesNotExist_ShouldReturnEmpty() {
        // Given
        String auth0Id = "auth0|nonexistent";
        String newFirstName = "Updated";
        String newLastName = "User";

        when(userRepository.findByAuth0Id(auth0Id)).thenReturn(Optional.empty());

        // When
        Optional<AppUser> result = appUserService.updateUserNamesByAuth0Id(auth0Id, newFirstName, newLastName);

        // Then
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findByAuth0Id(auth0Id);
        verify(userRepository, never()).save(any(AppUser.class));
    }

    @Test
    void deleteById_ShouldCallRepositoryDeleteById() {
        // Given
        Long userId = 1L;

        // When
        appUserService.deleteById(userId);

        // Then
        verify(userRepository, times(1)).deleteById(userId);
    }
}
