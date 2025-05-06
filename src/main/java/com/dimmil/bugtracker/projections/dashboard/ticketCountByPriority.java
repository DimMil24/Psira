package com.dimmil.bugtracker.projections.dashboard;

import com.dimmil.bugtracker.entities.enums.TicketPriority;
import com.dimmil.bugtracker.entities.enums.TicketStatus;

public interface ticketCountByPriority {
    TicketPriority getPriority();
    Long getCount();
}
