package com.dimmil.bugtracker.entities.requests.project;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class CreateProjectRequest {
    private String title;
    private String description;
    private String priority;
    private LocalDate deadline;
    private List<Long> users;
}
