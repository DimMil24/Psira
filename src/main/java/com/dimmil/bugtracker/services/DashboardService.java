package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.Project;
import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.enums.TicketStatus;
import com.dimmil.bugtracker.entities.responses.dashboard.*;
import com.dimmil.bugtracker.projections.dashboard.projectCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByProject;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final ProjectService projectService;
    private final TicketService ticketService;

    public DashboardResponse getDashboard(User user) {
        long openTickets = 0;
        long closedTickets = 0;
        Long totalProjects = projectService.getNumberOfProjects(user);
        List<ticketCountByStatus> totalTickets = ticketService.countTicketsByStatus(user);
        List<ticketCountByPriority> ticketsByPriority = ticketService.countTicketsByPriority(user);

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

        var recentTickets = ticketService.getLast5ModifiedTickets(user);

        var upcomingDeadlineProjects = projectService.get5ProjectsWithDeadlineClose(user);
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

        var projectNumberByPriority = projectService.getProjectsCountByPriority(user);
        List<ProjectNumberByPriorityResponse> projectNumberByPriorityResponse = new ArrayList<>();
        for (projectCountByPriority p : projectNumberByPriority) {
            projectNumberByPriorityResponse.add(
                    ProjectNumberByPriorityResponse
                            .builder()
                            .label(p.getPriority().getLabel())
                            .value(p.getCount())
                            .build()
            );
        }

        var ticketsByProject = ticketService.getTicketCountByProject(user);
        List<TicketCountByProjectResponse> ticketCountByProjectResponse = new ArrayList<>();
        for (ticketCountByProject p : ticketsByProject) {
            ticketCountByProjectResponse.add(
                    TicketCountByProjectResponse
                            .builder()
                            .name(p.getName())
                            .count(p.getCount())
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
                .projectNumberByPriority(projectNumberByPriorityResponse)
                .ticketCountByProject(ticketCountByProjectResponse)
                .dashboardTickets(recentTickets)
                .build();
    }
}
