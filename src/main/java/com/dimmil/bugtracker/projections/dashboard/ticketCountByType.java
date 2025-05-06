package com.dimmil.bugtracker.projections.dashboard;

import com.dimmil.bugtracker.entities.enums.TicketStatus;

public interface ticketCountByType {
    TicketStatus getStatus();
    Long getCount();
}
