package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.ticket.id = :ticketId order by c.createdAt ")
    List<Comment> findByTicketId(@Param("ticketId") Long ticketId);
}
