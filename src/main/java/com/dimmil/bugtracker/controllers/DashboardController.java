package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.responses.dashboard.DashboardResponse;
import com.dimmil.bugtracker.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardData(@AuthenticationPrincipal User user) {
        var dashboard = dashboardService.getDashboard(user);
        return ResponseEntity.ok(dashboard);
    }
}
