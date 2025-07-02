package com.dimmil.bugtracker.projections.dashboard;

import com.dimmil.bugtracker.entities.enums.TicketStatus;

public interface ticketCountByStatus {
    TicketStatus getStatus();
    Long getCount();
}
