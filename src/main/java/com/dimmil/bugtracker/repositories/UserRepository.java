package com.dimmil.bugtracker.repositories;

import com.dimmil.bugtracker.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u join u.projects p where p.id = :id")
    List<User> getTop3Users(@Param("id") UUID id, Pageable pageable);

    @Query("select u from User u join u.projects p where p.id = :projectId and u.role = 'ROLE_DEVELOPER' ")
    List<User> getDevsInProject(@Param("projectId") UUID projectId);

    @Query("select u from User u where u.id <> (select p.owner.id from Project p where p.id = :projectId )")
    List<User>getAllUsersExceptOwner(@Param("projectId") UUID projectId);

    Optional<User> findByEmail(String email);
}
