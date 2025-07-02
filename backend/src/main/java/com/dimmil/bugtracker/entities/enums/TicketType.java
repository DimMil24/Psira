package com.dimmil.bugtracker.entities.enums;

public enum TicketType {
    NEW_DEVELOPMENT("New Development"),
    WORK_TASK("Work Task"),
    DEFECT("Defect"),
    CHANGE_REQUEST("Change Request"),
    ENHANCEMENT("Enhancement"),
    GENERAL_TASK("General Task");

    private final String label;

    private TicketType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static TicketType getType(String label) {
        switch (label) {
            case "New Development" -> {
                return TicketType.NEW_DEVELOPMENT;
            }
            case "Work Task" -> {
                return TicketType.WORK_TASK;
            }
            case "Defect" -> {
                return TicketType.DEFECT;
            }
            case "Change Request" -> {
                return TicketType.CHANGE_REQUEST;
            }
            case "Enhancement" -> {
                return TicketType.ENHANCEMENT;
            }
            default -> {
                return TicketType.GENERAL_TASK;
            }
        }
    }
}
