package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.Project;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    @Query("select p from Project p join p.users pu where pu.id = :userId")
    List<Project> getProjectsThatUserIsPartOf(@Param("userId") Long userId);

    @Query("select p from Project p join p.users pu where pu.id = :userId and p.deadline BETWEEN :today AND :nextMonth ORDER BY p.deadline ASC")
    List<Project> getProjectsWithDeadlineClose(@Param("userId") Long userId, @Param("today") LocalDate today, @Param("nextMonth") LocalDate nextMonth, Limit limit);

    @Query("select count(p) from Project p join p.users pu where pu.id = :userId")
    Long countProjects(@Param("userId") Long userId);

}
