package com.dimmil.bugtracker.entities.responses.project;


import com.dimmil.bugtracker.entities.responses.ticket.AllTicketsByStatusResponse;
import com.dimmil.bugtracker.entities.responses.user.UserResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProjectResponse {
    private UUID id;
    private String projectName;
    private UserResponse ownerUser;
    private List<UserResponse> users;
    private LocalDate startDate;
    private LocalDate deadline;
    private String priority;
    private String description;
    private AllTicketsByStatusResponse tickets;
}
