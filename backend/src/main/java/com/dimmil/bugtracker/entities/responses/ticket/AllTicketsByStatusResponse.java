package com.dimmil.bugtracker.entities.responses.ticket;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AllTicketsByStatusResponse {
    private List<TicketByStatusResponse> open;
    private List<TicketByStatusResponse> resolved;
}
