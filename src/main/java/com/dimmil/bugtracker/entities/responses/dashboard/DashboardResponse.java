package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardResponse {
    private Long totalProjects;
    private Long totalTickets;
    private Long openTickets;
    private Long closedTickets;
    private List<TicketNumberByPriorityResponse> priorityTickets;
    private List<TicketNumberByStatusResponse> statusTickets;
    private List<ProjectDeadlineResponse> deadlineProjects;
    private List<TicketDashboardResponse> dashboardTickets;
}
