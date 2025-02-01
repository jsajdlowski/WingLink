package com.winglink.backend.controller;

import com.winglink.backend.config.security.SecurityUtils;
import com.winglink.backend.dto.AppUserNamesDto;
import com.winglink.backend.entity.AppUser;
import com.winglink.backend.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class AppUserController {
    private final AppUserService userService;

    public AppUserController(AppUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AppUser>> getUsers() {
        List<AppUser> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<AppUser> addUser(@RequestBody AppUser user) {
        AppUser userSaved = userService.save(user);
        return new ResponseEntity<>(userSaved,HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<AppUser> getUser() {
        String auth0Id = SecurityUtils.getAuth0UserId();
        return userService.getUserByAuth0Id(auth0Id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUser(@PathVariable long id) {
        return userService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/me/updatenames")
    public ResponseEntity<AppUser> updateNames(@RequestBody AppUserNamesDto userNamesDTO) {
        String auth0Id = SecurityUtils.getAuth0UserId();
        return userService.updateUserNamesByAuth0Id(auth0Id, userNamesDTO.getFirstName(), userNamesDTO.getLastName()).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AppUser> deleteUser(@PathVariable long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
