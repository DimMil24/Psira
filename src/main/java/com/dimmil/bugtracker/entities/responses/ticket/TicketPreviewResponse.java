package com.dimmil.bugtracker.entities.responses.ticket;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketPreviewResponse {
    private Long id;
    private String name;
    private String projectName;
    private String projectId;
    private String status;
    private String priority;
    private String type;
    private String modified;
    private String submitted;
}
