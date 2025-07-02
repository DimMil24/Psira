package com.dimmil.bugtracker.entities.enums;

public enum TicketPriority {
    LOW("Low"),
    MEDIUM("Medium"),
    HIGH("High"),
    URGENT("Urgent");

    private final String label;

    private TicketPriority(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static TicketPriority getPriority(String label) {
        switch (label) {
            case "Medium" -> {
                return TicketPriority.MEDIUM;
            }
            case "High" -> {
                return TicketPriority.HIGH;
            }
            case "Urgent" -> {
                return TicketPriority.URGENT;
            }
            default -> {
                return TicketPriority.LOW;
            }
        }
    }
}
