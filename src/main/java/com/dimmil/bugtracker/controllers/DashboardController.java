package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.responses.dashboard.DashboardResponse;
import com.dimmil.bugtracker.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardData() {
        var dashboard = dashboardService.getDashboard();
        return ResponseEntity.ok(dashboard);
    }
}
