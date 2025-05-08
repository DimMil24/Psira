package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.Project;
import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.enums.TicketStatus;
import com.dimmil.bugtracker.entities.responses.dashboard.DashboardResponse;
import com.dimmil.bugtracker.entities.responses.dashboard.ProjectDeadlineResponse;
import com.dimmil.bugtracker.entities.responses.dashboard.TicketNumberByPriorityResponse;
import com.dimmil.bugtracker.entities.responses.dashboard.TicketNumberByStatusResponse;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByStatus;
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
    private final TicketService ticketService;

    public DashboardResponse getDashboard(User user) {
        var totalProjects = projectService.getNumberOfProjectsThatUserIsPartOf(user);
        var totalTickets = ticketRepository.countTicketsByStatus(user.getId());

        long openTickets = 0;
        long closedTickets = 0;

        List<TicketNumberByStatusResponse> ticketsByStatus = new ArrayList<>();
        for (ticketCountByStatus c : totalTickets) {
            ticketsByStatus.add(
                    TicketNumberByStatusResponse
                            .builder()
                            .label(c.getStatus().getLabel())
                            .value(c.getCount())
                            .build()
            );
            if (c.getStatus() == TicketStatus.RESOLVED) {
                closedTickets = c.getCount();
            } else {
                openTickets = openTickets + c.getCount();
            }
        }

        var ticketsByPriority = ticketRepository.countTicketsByPriority(user.getId());
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

        var recentTickets = ticketService.getLast5ModifiedTickets(user.getId());

        var upcomingDeadlineProjects = projectService.get5ProjectsWithDeadlineClose(user.getId());
        List<ProjectDeadlineResponse> deadlineProjects = new ArrayList<>();
        for (Project p : upcomingDeadlineProjects) {
            deadlineProjects.add(
                    ProjectDeadlineResponse
                            .builder()
                            .projectId(p.getId())
                            .projectName(p.getTitle())
                            .startDate(p.getStartDate())
                            .deadline(p.getDeadline())
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
                .statusTickets(ticketsByStatus)
                .deadlineProjects(deadlineProjects)
                .dashboardTickets(recentTickets)
                .build();
    }
}
