package com.dimmil.bugtracker.entities.responses.ticket;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AllTicketsResponse {
    private List<TicketPreviewResponse> tickets;
}
