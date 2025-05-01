package com.dimmil.bugtracker.entities.responses.comment;

import com.dimmil.bugtracker.entities.responses.user.UserNameResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentResponse {
    private final Long id;
    private final String comment;
    private final Long ticketId;
    private final String createdAt;
    private final UserNameResponse user;
}
