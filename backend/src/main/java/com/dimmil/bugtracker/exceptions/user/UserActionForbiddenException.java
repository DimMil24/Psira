package com.dimmil.bugtracker.exceptions.user;

public class UserActionForbiddenException extends RuntimeException {
    public UserActionForbiddenException() {
        super("You do not have permission to perform this action");
    }
}
