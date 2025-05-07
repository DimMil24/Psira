package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketDashboardResponse {
    private Long id;
    private String name;
    private String status;
    private String type;
    private String modified;
    private String assigned;
}
