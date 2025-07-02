package com.dimmil.bugtracker.entities.requests.comment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCommentRequest {
    private final String comment;
    private final Long ticketId;
}
