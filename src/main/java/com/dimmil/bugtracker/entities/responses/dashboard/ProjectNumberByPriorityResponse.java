package com.dimmil.bugtracker.entities.responses.dashboard;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProjectNumberByPriorityResponse {
    private String label;
    private Long value;
}
