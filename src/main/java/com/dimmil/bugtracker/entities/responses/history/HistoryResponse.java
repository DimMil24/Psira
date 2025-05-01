package com.dimmil.bugtracker.entities.responses.history;

import com.dimmil.bugtracker.entities.responses.user.UserNameResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HistoryResponse {
    private Long id;
    private String fullName;
    private String date;
    private String text;
}
