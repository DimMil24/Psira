package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.responses.user.UserResponse;
import com.dimmil.bugtracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/caller")
    public ResponseEntity<List<UserResponse>> getAllUsers(@AuthenticationPrincipal User user) {
        var response = userService.findAllUsersExceptCaller(user.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/owner/{projectId}")
    public ResponseEntity<List<UserResponse>> getAllUsersExceptOwner(@PathVariable UUID projectId) {
        var response = userService.findAllUsersExceptOwner(projectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
