package com.dimmil.bugtracker.entities.requests.ticket;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CreateTicketRequest {
    private String title;
    private String description;
    private String status;
    private String priority;
    private String type;
    private Long developerId;
    private UUID projectId;
}
