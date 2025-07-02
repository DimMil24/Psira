package com.dimmil.bugtracker.entities.responses.auth;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;

}
