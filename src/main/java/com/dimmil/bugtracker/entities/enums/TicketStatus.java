package com.dimmil.bugtracker.entities.enums;

public enum TicketStatus {
    NEW("New"),
    IN_DEVELOPMENT("In Development"),
    TESTING("Testing"),
    RESOLVED("Resolved");

    private final String label;

    private TicketStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static TicketStatus getStatus(String label) {
        switch (label) {
            case "In Development" -> {
                return TicketStatus.IN_DEVELOPMENT;
            }
            case "Testing" -> {
                return TicketStatus.TESTING;
            }
            case "Resolved" -> {
                return TicketStatus.RESOLVED;
            }
            case "New" -> {
                return TicketStatus.NEW;
            }
            default -> {
                throw new IllegalArgumentException("Invalid ticket status");
            }
        }
    }
}
