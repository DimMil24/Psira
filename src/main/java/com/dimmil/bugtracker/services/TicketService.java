package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.History;
import com.dimmil.bugtracker.entities.Project;
import com.dimmil.bugtracker.entities.Ticket;
import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.enums.*;
import com.dimmil.bugtracker.entities.requests.ticket.CreateTicketRequest;
import com.dimmil.bugtracker.entities.requests.ticket.UpdateTicketRequest;
import com.dimmil.bugtracker.entities.responses.dashboard.TicketDashboardResponse;
import com.dimmil.bugtracker.entities.responses.ticket.*;
import com.dimmil.bugtracker.entities.responses.user.UserResponse;
import com.dimmil.bugtracker.exceptions.project.ProjectNotFoundException;
import com.dimmil.bugtracker.exceptions.ticket.TicketNotFoundException;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByProject;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByStatus;
import com.dimmil.bugtracker.repositories.HistoryRepository;
import com.dimmil.bugtracker.repositories.ProjectRepository;
import com.dimmil.bugtracker.repositories.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserService userService;
    private final ProjectRepository projectRepository;
    private final HistoryRepository historyRepository;
    private final DateTimeFormatter dateTimeFormatter;
    private final DateTimeFormatter dateTimeFormatterShort;
    private final HistoryService historyService;

    @Transactional
    public void createTicket(CreateTicketRequest createTicketRequest, User user) {

        Project project = projectRepository.findById(createTicketRequest.getProjectId()).orElseThrow(() ->
                new ProjectNotFoundException(createTicketRequest.getProjectId()));

        //Add exception here if not dev and in Project.
        User dev = null;
        if (createTicketRequest.getDeveloperId() != -1) {
            dev = userService.findById(createTicketRequest.getDeveloperId());
        }

        LocalDateTime now = LocalDateTime.now();



        Ticket ticket = Ticket.builder()
                .name(createTicketRequest.getTitle())
                .description(createTicketRequest.getDescription())
                .created(now)
                .modified(now)
                .submitted(user)
                .project(project)
                .priority(TicketPriority.getPriority(createTicketRequest.getPriority()))
                .status(TicketStatus.getStatus(createTicketRequest.getStatus()))
                .type(TicketType.getType(createTicketRequest.getType()))
                .assigned(dev)
                .build();

        ticketRepository.save(ticket);

        History history = History.builder()
                .date(now)
                .type(HistoryEnum.CREATED)
                .ticket(ticket)
                .user(user)
                .build();

        historyRepository.save(history);
    }

    @Transactional
    public void updateTicket(UpdateTicketRequest updateTicket, UUID projectId, Long ticketId, User user) {
        var ticket = ticketRepository.getTicketByIdAndProjectId(ticketId, projectId)
                .orElseThrow(() -> new TicketNotFoundException(ticketId));

        //Add exception here if not dev and in Project.
        User dev = null;
        if (updateTicket.getDeveloperId() != -1) {
            dev = userService.findById(updateTicket.getDeveloperId());
        }

        List<History> historyList = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        if (!ticket.getName().equals(updateTicket.getTitle())) {
            var before = ticket.getName();
            ticket.setName(updateTicket.getTitle());
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_NAME)
                    .from(before)
                    .to(updateTicket.getTitle())
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }

        if (!ticket.getDescription().equals(updateTicket.getDescription())) {
            ticket.setDescription(updateTicket.getDescription());
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_DESCRIPTION)
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }

        if (ticket.getPriority() != TicketPriority.getPriority(updateTicket.getPriority())) {
            var before = ticket.getPriority().getLabel();
            ticket.setPriority(TicketPriority.getPriority(updateTicket.getPriority()));
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_PRIORITY)
                    .from(before)
                    .to(updateTicket.getPriority())
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }

        if (ticket.getStatus() != TicketStatus.getStatus(updateTicket.getStatus())) {
            var before = ticket.getStatus().getLabel();
            ticket.setStatus(TicketStatus.getStatus(updateTicket.getStatus()));
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_STATUS)
                    .from(before)
                    .to(updateTicket.getStatus())
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }

        if (ticket.getType() != TicketType.getType(updateTicket.getType())) {
            var before = ticket.getType().getLabel();
            ticket.setType(TicketType.getType(updateTicket.getType()));
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_TYPE)
                    .from(before)
                    .to(updateTicket.getType())
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }

        if (ticket.getAssigned() != dev) {

            String from = null;
            if (ticket.getAssigned() != null) {
                from = ticket.getAssigned().getFullName();
            }

            String to = null;
            if (dev != null) {
                to = dev.getFullName();
            }
            ticket.setAssigned(dev);
            History history = History.builder()
                    .user(user)
                    .date(now)
                    .type(HistoryEnum.CHANGE_ASSIGNED)
                    .from(from)
                    .to(to)
                    .ticket(ticket)
                    .build();
            historyList.add(history);
        }
        if (!historyList.isEmpty()) {
            ticket.setModified(now);
            historyRepository.saveAll(historyList);
        }
    }

    public AllTicketsResponse getAllTickets(User user, boolean open, boolean ownTickets) {
        var data = new ArrayList<TicketPreviewResponse>();
        List<Ticket> list;
        if (ownTickets) {
            list = ticketRepository.getUserTickets(user.getId());
        } else {
            list = getTicketsByRole(user, open);
        }
        for (Ticket ticket : list) {
            data.add(TicketPreviewResponse.builder()
                    .id(ticket.getId())
                    .name(ticket.getName())
                    .projectId(ticket.getProject().getId().toString())
                    .projectName(ticket.getProject().getTitle())
                    .type(ticket.getType().getLabel())
                    .status(ticket.getStatus().getLabel())
                    .priority(ticket.getPriority().getLabel())
                    .modified(ticket.getModified().format(dateTimeFormatter))
                    .submitted(ticket.getSubmitted().getFullName())
                    .build()
            );
        }

        return AllTicketsResponse.builder().tickets(data).build();
    }

    public AllTicketsByStatusResponse getAllProjectTicketsByStatus(UUID proj_id) {
        List<Ticket> open = ticketRepository.getOpenTicketsByProjectIdOrderedByDate(proj_id);
        List<Ticket> resolved = ticketRepository.getResolvedTicketsByProjectIdOrderedByDate(proj_id);

        List<TicketByStatusResponse> openTickets = new ArrayList<>();
        for (Ticket ticket : open) {
            var t = TicketByStatusResponse.builder()
                    .id(ticket.getId())
                    .name(ticket.getName())
                    .status(ticket.getStatus().getLabel())
                    .type(ticket.getType().getLabel())
                    .priority(ticket.getPriority().getLabel())
                    .modified(ticket.getModified().format(dateTimeFormatter))
                    .submitted(ticket.getSubmitted().getFullName())
                    .build();
                openTickets.add(t);
        }

        List<TicketByStatusResponse> resolvedTickets = new ArrayList<>();
        for (Ticket ticket : resolved) {
            var t = TicketByStatusResponse.builder()
                    .id(ticket.getId())
                    .name(ticket.getName())
                    .status(ticket.getStatus().getLabel())
                    .type(ticket.getType().getLabel())
                    .priority(ticket.getPriority().getLabel())
                    .modified(ticket.getModified().format(dateTimeFormatter))
                    .submitted(ticket.getSubmitted().getFullName())
                    .build();
            resolvedTickets.add(t);
        }

        return AllTicketsByStatusResponse.builder()
                .open(openTickets)
                .resolved(resolvedTickets)
                .build();
    }

    public TicketResponse getTicket(User user, UUID projectId, Long ticketId) {
        Ticket ticket = ticketRepository.getTicketByIdAndProjectId(ticketId, projectId)
                .orElseThrow(() -> new TicketNotFoundException(ticketId));

        User submittedByUser = ticket.getSubmitted();

        var submittedBy = UserResponse.builder()
                .fullName(submittedByUser.getFullName())
                .id(submittedByUser.getId())
                .role(submittedByUser.getRole().name())
                .build();

        UserResponse assignedTo;

        if (ticket.getAssigned() != null) {

            User assignedToUser = ticket.getAssigned();
            assignedTo = UserResponse.builder()
                    .fullName(assignedToUser.getFullName())
                    .id(assignedToUser.getId())
                    .role(assignedToUser.getRole().name())
                    .build();
        } else {
            assignedTo = UserResponse.builder()
                    .fullName("Unassigned")
                    .id((long) -1)
                    .build();
        }

        var historyResponse = historyService.getHistoryByTicketIdDTO(ticketId);

        return TicketResponse.builder()
                .id(ticket.getId())
                .name(ticket.getName())
                .description(ticket.getDescription())
                .projectName(ticket.getProject().getTitle())
                .status(ticket.getStatus().getLabel())
                .priority(ticket.getPriority().getLabel())
                .type(ticket.getType().getLabel())
                .submittedBy(submittedBy)
                .assignedTo(assignedTo)
                .created(ticket.getCreated().format(dateTimeFormatter))
                .updated(ticket.getModified().format(dateTimeFormatter))
                .history(historyResponse)
                .build();
    }

    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.getTicketById(ticketId).orElseThrow(() -> new TicketNotFoundException(ticketId));
    }

    public List<TicketDashboardResponse> getLast5ModifiedTickets(User user) {
        List<Ticket> tickets;
        if (user.getRole() == RoleEnum.ROLE_ADMIN) {
            tickets = ticketRepository.getAllTicketsThatUserIsPartOfLimitAdmin( Limit.of(5));
        }
        else {
            tickets = ticketRepository.getAllTicketsThatUserIsPartOfLimit(user.getId(), Limit.of(5));
        }
        List<TicketDashboardResponse> responses = new ArrayList<>();

        for (Ticket ticket : tickets) {
            String userAssigned;
            if (ticket.getAssigned() != null) {
                userAssigned = ticket.getAssigned().getFullName();
            } else {
                userAssigned = "Unassigned";
            }
            responses.add(
                    TicketDashboardResponse
                            .builder()
                            .id(ticket.getId())
                            .name(ticket.getName())
                            .type(ticket.getType().getLabel())
                            .status(ticket.getStatus().getLabel())
                            .modified(ticket.getModified().format(dateTimeFormatterShort))
                            .assigned(userAssigned)
                            .build()
            );
        }
        return responses;
    }

    public List<ticketCountByProject> getTicketCountByProject(User user) {
        if (user.getRole() == RoleEnum.ROLE_ADMIN) {
            return ticketRepository.countTicketsByProjectAdmin();
        } else {
            return ticketRepository.countTicketsByProject(user.getId());
        }
    }

    public List<ticketCountByStatus> countTicketsByStatus(User user) {
        if (user.getRole() == RoleEnum.ROLE_ADMIN) {
            return ticketRepository.countTicketsByStatusAdmin();
        } else {
            return ticketRepository.countTicketsByStatus(user.getId());
        }
    }

    public List<ticketCountByPriority> countTicketsByPriority(User user) {
        if (user.getRole() == RoleEnum.ROLE_ADMIN) {
            return ticketRepository.countTicketsByPriorityAdmin();
        } else {
            return ticketRepository.countTicketsByPriority(user.getId());
        }
    }

    private List<Ticket> getTicketsByRole(User user, boolean open) {
        if (open) {
            if (user.getRole() == RoleEnum.ROLE_ADMIN) {
                return ticketRepository.getAllOpenTickets();
            } else {
                return ticketRepository.getAllOpenTicketsThatUserIsPartOf(user.getId());
            }
        } else {
            if (user.getRole() == RoleEnum.ROLE_ADMIN) {
                return ticketRepository.getAllResolvedTickets();
            } else {
                return ticketRepository.getAllResolvedTicketsThatUserIsPartOf(user.getId());
            }
        }

    }
}
