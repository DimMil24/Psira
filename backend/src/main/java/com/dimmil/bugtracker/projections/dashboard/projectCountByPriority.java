package com.dimmil.bugtracker.projections.dashboard;

import com.dimmil.bugtracker.entities.enums.ProjectPriority;

public interface projectCountByPriority {
    ProjectPriority getPriority();
    Long getCount();
}
