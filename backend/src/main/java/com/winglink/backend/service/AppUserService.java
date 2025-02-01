package com.winglink.backend.service;

import com.winglink.backend.entity.AppUser;
import com.winglink.backend.enums.UserRole;
import com.winglink.backend.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AppUserService {
    private final AppUserRepository userRepository;

    public AppUserService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AppUser save(AppUser user) {
        user.setRole(UserRole.NORMAL);
        user.setTickets(Collections.emptyList());
        return userRepository.save(user);
    }

    public AppUser getOrCreateUser(String auth0Id, String firstName, String lastName, String email) {
        return userRepository.findByAuth0Id(auth0Id)
                .orElseGet(() -> {
                    AppUser newUser = new AppUser();
                    newUser.setAuth0Id(auth0Id);
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);
                    newUser.setEmail(email);
                    return userRepository.save(newUser);
                });
    }

    public Optional<AppUser> getUserByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id);
    }

    public Optional<AppUser> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<AppUser> findAll() {
        return userRepository.findAll();
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
