package com.dimmil.bugtracker.entities.requests.auth;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
