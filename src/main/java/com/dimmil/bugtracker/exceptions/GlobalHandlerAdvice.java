package com.dimmil.bugtracker.exceptions;

import com.dimmil.bugtracker.exceptions.project.ProjectNotFoundException;
import com.dimmil.bugtracker.exceptions.ticket.TicketNotFoundException;
import com.dimmil.bugtracker.exceptions.user.UserActionForbiddenException;
import com.dimmil.bugtracker.exceptions.user.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalHandlerAdvice {

    @ExceptionHandler(TicketNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String ticketNotFoundHandler(TicketNotFoundException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String projectNotFoundHandler(ProjectNotFoundException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundHandler(UserNotFoundException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String badCredentialsHandler(BadCredentialsException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String forbiddenHandler(AuthorizationDeniedException ex) {
        return ex.getMessage();
    }
    
    @ExceptionHandler(UserActionForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String userActionForbiddenHandler(UserActionForbiddenException ex) {
        return ex.getMessage();
    }
}
