package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class ProjectDeadlineResponse {
    private UUID projectId;
    private String projectName;
    private LocalDate startDate;
    private LocalDate deadline;
}
