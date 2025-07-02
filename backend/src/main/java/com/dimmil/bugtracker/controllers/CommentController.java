package com.dimmil.bugtracker.controllers;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.requests.comment.CreateCommentRequest;
import com.dimmil.bugtracker.entities.responses.comment.CommentResponse;
import com.dimmil.bugtracker.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("{ticketId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByTicketId(@PathVariable Long ticketId) {
        var response = commentService.fetchComments(ticketId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CreateCommentRequest comment, @AuthenticationPrincipal User user) {
        commentService.addComment(comment,user);
        return ResponseEntity.ok().build();
    }
}
