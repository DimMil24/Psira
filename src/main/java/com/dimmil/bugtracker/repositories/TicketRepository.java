package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.Ticket;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByPriority;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByProject;
import com.dimmil.bugtracker.projections.dashboard.ticketCountByStatus;
import org.springframework.data.domain.Limit;
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

    @Query("select t from Ticket t join t.submitted u where u.id = :userId order by t.modified desc ")
    List<Ticket> getUserTickets(@Param("userId") Long userId);

    @Query("select t from Ticket t where t.project.id = :projectId and t.status <> 'RESOLVED' order by t.modified desc ")
    List<Ticket> getOpenTicketsByProjectIdOrderedByDate(@Param("projectId") UUID projectId);

    @Query("select t from Ticket t where t.project.id = :projectId and t.status = 'RESOLVED' order by t.modified desc ")
    List<Ticket> getResolvedTicketsByProjectIdOrderedByDate(@Param("projectId") UUID projectId);

    @Query("select t.status as status,count(t) as count from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) group by t.status")
    List<ticketCountByStatus> countTicketsByStatus(@Param("userId") Long userId);

    @Query("select t.priority as priority,count(t) as count from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) group by t.priority")
    List<ticketCountByPriority> countTicketsByPriority(@Param("userId") Long userId);

    @Query("select t.project.title as name,count(t) as count from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) group by t.project.title")
    List<ticketCountByProject> countTicketsByProject(@Param("userId") Long userId);

    @Query("select t from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) order by t.modified desc ")
    List<Ticket> getAllTicketsThatUserIsPartOfLimit(@Param("userId") Long userId, Limit limit);

    @Query("select t from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) and t.status = 'RESOLVED' order by t.modified desc ")
    List<Ticket> getAllResolvedTicketsThatUserIsPartOf(@Param("userId") Long userId);

    @Query("select t from Ticket t where t.project in (select p from Project p join p.users u where u.id = :userId) and t.status <> 'RESOLVED' order by t.modified desc ")
    List<Ticket> getAllOpenTicketsThatUserIsPartOf(@Param("userId") Long userId);
}
