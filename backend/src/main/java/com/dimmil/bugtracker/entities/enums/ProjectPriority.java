package com.dimmil.bugtracker.entities.enums;

public enum ProjectPriority {
    LOW("Low"),
    MEDIUM("Medium"),
    HIGH("High"),
    URGENT("Urgent");

    private final String label;

    private ProjectPriority(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static ProjectPriority getPriority(String label) {
        switch (label) {
            case "Medium" -> {
                return ProjectPriority.MEDIUM;
            }
            case "High" -> {
                return ProjectPriority.HIGH;
            }
            case "Urgent" -> {
                return ProjectPriority.URGENT;
            }
            default -> {
                return ProjectPriority.LOW;
            }
        }
    }
}
