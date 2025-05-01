package com.dimmil.bugtracker.entities.responses.ticket;

import com.dimmil.bugtracker.entities.responses.project.ProjectNameResponse;
import com.dimmil.bugtracker.entities.responses.user.UserNameResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TicketSubmitPageResponse {
    private List<ProjectNameResponse> projects;
    private List<UserNameResponse> developers;
}
