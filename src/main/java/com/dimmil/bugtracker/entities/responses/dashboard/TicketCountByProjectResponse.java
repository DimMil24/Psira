package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TicketCountByProjectResponse {
    private String name;
    private Long count;
}
