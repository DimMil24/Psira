package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.Project;
import com.dimmil.bugtracker.entities.Ticket;
import com.dimmil.bugtracker.entities.enums.TicketStatus;
import com.dimmil.bugtracker.entities.responses.ticket.TicketPreviewResponse;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("select t from Ticket t where t.id = :ticketId")
    Optional<Ticket> getTicketById(@Param("ticketId") Long ticketId);

    @Query("select t from Ticket t where t.id = :ticketId and t.project.id =:projectId")
    Optional<Ticket> getTicketByIdAndProjectId(@Param("ticketId") Long ticketId,@Param("projectId") UUID projectId);

    @Query("select t from Ticket t where t.project.id = :projectId")
    List<Ticket> getAllTicketsByProjectId(@Param("projectId") UUID projectId);

    @Query("select t from Ticket t join t.submitted u where u.id = :userId order by t.modified desc ")
    List<Ticket> getUserTickets(@Param("userId") Long userId);


    @Query("select t from Ticket t where t.project.id = :projectId and t.status <> 'RESOLVED' order by t.modified desc ")
    List<Ticket> getOpenTicketsByProjectIdOrderedByDate(@Param("projectId") UUID projectId);

    @Query("select t from Ticket t where t.project.id = :projectId and t.status = 'RESOLVED' order by t.modified desc ")
    List<Ticket> getResolvedTicketsByProjectIdOrderedByDate(@Param("projectId") UUID projectId);

    @Query("select t.status as status,count(t) as count from Ticket t group by t.status")
    List<ticketCountByType> countTicketsByStatus();

    @Query("select t.priority as priority,count(t) as count from Ticket t group by t.priority")
    List<ticketCountByPriority> countTicketsByPriority();

    @Query("select extract(MONTH from t.created) as month, count(t) as count from Ticket t where extract(year from t.created) =:year group by extract(month from t.created) ")
    List<Object[]> countSubmittedByMonth(@Param("year") int year);

    @Query("select extract(MONTH from t.created) as month, count(t) as count from Ticket t where extract(year from t.created) =:year and t.status = 'RESOLVED' group by extract(month from t.created) ")
    List<Object[]> countResolvedByMonth(@Param("year") int year);
}
