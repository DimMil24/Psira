package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.enums.TicketStatus;
import com.dimmil.bugtracker.entities.responses.dashboard.DashboardResponse;
import com.dimmil.bugtracker.entities.responses.dashboard.TicketNumberByPriorityResponse;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByType;
import com.dimmil.bugtracker.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final ProjectService projectService;
    private final TicketRepository ticketRepository;
    
    public DashboardResponse getDashboard() {
        var totalProjects = projectService.getNumberOfProjects();
        var totalTickets = ticketRepository.countTicketsByStatus();

        long openTickets = 0;
        long closedTickets = 0;

        for (ticketCountByType c : totalTickets) {
            if (c.getStatus() == TicketStatus.RESOLVED) {
                closedTickets = c.getCount();
            } else {
                openTickets = openTickets + c.getCount();
            }
        }

        var ticketsByPriority = ticketRepository.countTicketsByPriority();
        List<TicketNumberByPriorityResponse> priorityTickets = new ArrayList<>();
        for (ticketCountByPriority tc : ticketsByPriority) {
            priorityTickets.add(
                    TicketNumberByPriorityResponse
                            .builder()
                            .priority(tc.getPriority().getLabel())
                            .count(tc.getCount())
                            .build()
            );
        }

        return DashboardResponse
                .builder()
                .totalProjects(totalProjects)
                .closedTickets(closedTickets)
                .openTickets(openTickets)
                .totalTickets(openTickets + closedTickets)
                .priorityTickets(priorityTickets)
                .build();
    }
}
