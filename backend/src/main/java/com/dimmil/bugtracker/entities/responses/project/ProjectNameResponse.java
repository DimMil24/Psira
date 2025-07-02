package com.dimmil.bugtracker.entities.responses.project;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProjectNameResponse {
    private UUID projectId;
    private String fullName;
}
