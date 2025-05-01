package com.dimmil.bugtracker.entities.responses.ticket;

import com.dimmil.bugtracker.entities.responses.history.HistoryResponse;
import com.dimmil.bugtracker.entities.responses.user.UserResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TicketResponse {
    private Long id;
    private String name;
    private String description;
    private String projectName;
    private String status;
    private String priority;
    private String type;
    private UserResponse submittedBy;
    private UserResponse assignedTo;
    private String created;
    private String updated;
    private List<HistoryResponse> history;
}
