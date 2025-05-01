package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.requests.ticket.CreateTicketRequest;
import com.dimmil.bugtracker.entities.requests.ticket.UpdateTicketRequest;
import com.dimmil.bugtracker.entities.responses.project.ProjectNameResponse;
import com.dimmil.bugtracker.entities.responses.ticket.TicketSubmitPageResponse;
import com.dimmil.bugtracker.entities.responses.user.UserNameResponse;
import com.dimmil.bugtracker.services.ProjectService;
import com.dimmil.bugtracker.services.TicketService;
import com.dimmil.bugtracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/tickets")
public class TicketController {

    private final ProjectService projectService;
    private final UserService userService;
    private final TicketService ticketService;

    @GetMapping("/{projectId}/{ticketId}")
    public ResponseEntity<?> getTicket(@AuthenticationPrincipal User user,@PathVariable UUID projectId ,@PathVariable Long ticketId ) {
        var response = ticketService.getTicket(user,projectId,ticketId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/open")
    public ResponseEntity<?> getOpenTickets(@AuthenticationPrincipal User user) {
        var response = ticketService.getAllTickets(user,true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resolved")
    public ResponseEntity<?> getResolvedTickets(@AuthenticationPrincipal User user) {
        var response = ticketService.getAllTickets(user,false);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/own")
    public ResponseEntity<?> getUserTickets(@AuthenticationPrincipal User user) {
        var response = ticketService.getAllUserTickets(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@AuthenticationPrincipal User user,
                                          @RequestBody CreateTicketRequest createTicketRequest) {
        ticketService.createTicket(createTicketRequest, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{projectId}/{ticketId}")
    public ResponseEntity<?> updateTicket(@AuthenticationPrincipal User user,
                                          @RequestBody UpdateTicketRequest updateTicketRequest,
                                          @PathVariable UUID projectId,
                                          @PathVariable Long ticketId ) {
        ticketService.updateTicket(updateTicketRequest,projectId,ticketId,user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/submit/projects")
    public ResponseEntity<List<ProjectNameResponse>> getProjectData(@AuthenticationPrincipal User user) {
        var projects = projectService.getProjectsThatUserIsPartOf(user.getId());
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/submit/devs")
    public ResponseEntity<List<UserNameResponse>> getDevData(@RequestParam UUID projectId) {
        var devs = userService.getDevsInProject(projectId);
        var response = new ArrayList<UserNameResponse>();

        for (var dev : devs) {
            response.add(
                    UserNameResponse.builder()
                            .fullName(dev.getFullName())
                            .id(dev.getId())
                    .build()
            );
        }

        return ResponseEntity.ok(response);
    }
}
