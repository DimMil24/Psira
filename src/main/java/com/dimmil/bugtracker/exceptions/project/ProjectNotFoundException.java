package com.dimmil.bugtracker.exceptions.project;

import java.util.UUID;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(UUID id) {
        super("Could not find project with id: " + id);
    }
}
