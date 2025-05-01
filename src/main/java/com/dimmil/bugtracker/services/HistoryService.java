package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.History;
import com.dimmil.bugtracker.entities.enums.HistoryEnum;
import com.dimmil.bugtracker.entities.responses.history.HistoryResponse;
import com.dimmil.bugtracker.repositories.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final DateTimeFormatter dateTimeFormatterShort;

    public String getText(HistoryEnum type, String from, String to) {
        switch (type) {
            case CHANGE_NAME -> {
                return String.format("Changed Ticket Title from %s to %s.", from, to);
            }
            case CHANGE_ASSIGNED -> {
                if (to == null) {
                    return String.format("Ticket unassigned from %s.", from);
                }
                if (from == null) {
                    return String.format("Assigned Ticket to %s.", to);
                }
                else {
                    return String.format("Assigned Ticket from %s to %s.", from, to);
                }
            }
            case CHANGE_DESCRIPTION -> {
                return "Ticket Description changed.";
            }
            case CHANGE_PRIORITY -> {
                return String.format("Priority changed from %s to %s.", from, to);
            }
            case CHANGE_STATUS -> {
                return String.format("Status changed from %s to %s.", from, to);
            }
            case CHANGE_TYPE -> {
                return String.format("Type changed from %s to %s.", from, to);
            }
            case CREATED -> {
                return "Ticket submitted.";
            }
            //TODO: CREATE PROPER EXCEPTION
            default -> {
                throw new IllegalArgumentException("Invalid HistoryEnum");
            }
        }
    }

    public List<HistoryResponse> getHistoryByTicketIdDTO(Long ticketId) {
        List<History> histories = historyRepository.findByTicketId(ticketId);
        List<HistoryResponse> historiesResponse = new ArrayList<>();

        for (History history : histories) {
            var item = HistoryResponse.builder()
                    .id(history.getId())
                    .fullName(history.getUser().getFullName())
                    .date(history.getDate().format(dateTimeFormatterShort))
                    .text(getText(history.getType(), history.getFrom(), history.getTo()))
                    .build();
            historiesResponse.add(item);
        }
        return historiesResponse;
    }
}
