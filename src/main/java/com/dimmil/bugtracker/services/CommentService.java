package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.Comment;
import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.requests.comment.CreateCommentRequest;
import com.dimmil.bugtracker.entities.responses.comment.CommentResponse;
import com.dimmil.bugtracker.entities.responses.user.UserNameResponse;
import com.dimmil.bugtracker.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketService ticketService;
    private final DateTimeFormatter dateTimeFormatterShort;

    public void addComment(CreateCommentRequest comment, User user) {
        //TODO: Secure if user can comment on project
        var ticket = ticketService.getTicketById(comment.getTicketId());

        var newComment = Comment.builder()
                .text(comment.getComment())
                .createdAt(LocalDateTime.now())
                .submitter(user)
                .ticket(ticket)
                .build();

        commentRepository.save(newComment);
    }

    public List<CommentResponse> fetchComments(Long ticketId) {
        List<Comment> comments = commentRepository.findByTicketId(ticketId);

        List<CommentResponse> responses = new ArrayList<>();
        for (Comment comment : comments) {
            var userToAdd = UserNameResponse.builder()
                    .id(comment.getSubmitter().getId())
                    .fullName(comment.getSubmitter().getFullName())
                    .build();

            var comment_response = CommentResponse.builder()
                    .id(comment.getId())
                    .comment(comment.getText())
                    .createdAt(comment.getCreatedAt().format(dateTimeFormatterShort))
                    .ticketId(ticketId)
                    .user(userToAdd)
                    .build();

            responses.add(comment_response);
        }

        return responses;
    }
}
