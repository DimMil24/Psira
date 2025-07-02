package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.enums.RoleEnum;
import com.dimmil.bugtracker.entities.requests.auth.LoginRequest;
import com.dimmil.bugtracker.entities.requests.auth.RegisterRequest;
import com.dimmil.bugtracker.entities.responses.auth.LoginResponse;
import com.dimmil.bugtracker.repositories.UserRepository;
import com.dimmil.bugtracker.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {

        User user = User.builder()
                        .email(request.getEmail())
                        .firstName(StringUtils.capitalize(request.getFirstName().toLowerCase()))
                        .lastName(StringUtils.capitalize(request.getLastName().toLowerCase()))
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(RoleEnum.ROLE_ADMIN)
                        .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/register/manager")
    public ResponseEntity<?> registerManager(@RequestBody RegisterRequest request) {

        User user = User.builder()
                .email(request.getEmail())
                .firstName(StringUtils.capitalize(request.getFirstName().toLowerCase()))
                .lastName(StringUtils.capitalize(request.getLastName().toLowerCase()))
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleEnum.ROLE_MANAGER)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/register/developer")
    public ResponseEntity<?> registerDeveloper(@RequestBody RegisterRequest request) {

        User user = User.builder()
                .email(request.getEmail())
                .firstName(StringUtils.capitalize(request.getFirstName().toLowerCase()))
                .lastName(StringUtils.capitalize(request.getLastName().toLowerCase()))
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleEnum.ROLE_DEVELOPER)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/register/submitter")
    public ResponseEntity<?> registerSubmitter(@RequestBody RegisterRequest request) {

        User user = User.builder()
                .email(request.getEmail())
                .firstName(StringUtils.capitalize(request.getFirstName().toLowerCase()))
                .lastName(StringUtils.capitalize(request.getLastName().toLowerCase()))
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleEnum.ROLE_SUBMITTER)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String token = authService.authenticate(request);
        return ResponseEntity.ok( LoginResponse.builder().token(token).build());
    }

}
