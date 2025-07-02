package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.requests.project.CreateProjectRequest;
import com.dimmil.bugtracker.entities.requests.project.EditProjectRequest;
import com.dimmil.bugtracker.entities.responses.project.ProjectPreviewResponse;
import com.dimmil.bugtracker.entities.responses.project.ProjectResponse;
import com.dimmil.bugtracker.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectPreviewResponse>> getAllProjects(@AuthenticationPrincipal User user) {
        var response = projectService.getAllProjectsWithUserNameOnly(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createProject(@AuthenticationPrincipal User user,
            @RequestBody CreateProjectRequest createProjectRequest) {
        projectService.createProject(createProjectRequest,user.getId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("{projectId}")
    public ResponseEntity<ProjectResponse> getProjectById(@AuthenticationPrincipal User user, @PathVariable UUID projectId) {
        var response = projectService.getProjectById(user,projectId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("{projectId}")
    public ResponseEntity<?> updateProject(@AuthenticationPrincipal User user,
                                           @RequestBody EditProjectRequest editProjectRequest,
                                           @PathVariable UUID projectId) {
        projectService.updateProject(editProjectRequest,user,projectId);
        return ResponseEntity.ok().build();
    }
}
