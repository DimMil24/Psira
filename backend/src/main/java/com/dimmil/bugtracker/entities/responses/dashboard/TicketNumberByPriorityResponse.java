package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketNumberByPriorityResponse {
    private String priority;
    private Long count;
}
