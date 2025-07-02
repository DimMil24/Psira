package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.History;
import com.dimmil.bugtracker.entities.responses.history.HistoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("select h from History h where h.ticket.id = ?1 order by h.date desc ")
    List<History> findByTicketId(Long ticketId);
}
