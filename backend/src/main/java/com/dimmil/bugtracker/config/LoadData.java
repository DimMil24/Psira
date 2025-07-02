package com.dimmil.bugtracker.config;

import com.dimmil.bugtracker.entities.History;
import com.dimmil.bugtracker.entities.Project;
import com.dimmil.bugtracker.entities.Ticket;
import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.enums.*;
import com.dimmil.bugtracker.repositories.HistoryRepository;
import com.dimmil.bugtracker.repositories.ProjectRepository;
import com.dimmil.bugtracker.repositories.TicketRepository;
import com.dimmil.bugtracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class LoadData {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TicketRepository ticketRepository;
    private final HistoryRepository historyRepository;


    //This function seeds data for testing.
    @Transactional
    public void run() {
        if (userRepository.count() == 0) {

            var user1 = User.builder()
                    .email("admin")
                    .password(passwordEncoder.encode("123"))
                    .firstName("Dimitris")
                    .lastName("Milios")
                    .role(RoleEnum.ROLE_ADMIN)
                    .build();

            var user2 = User.builder()
                    .email("submitter")
                    .password(passwordEncoder.encode("123"))
                    .firstName("Tassos")
                    .lastName("Anastasiou")
                    .role(RoleEnum.ROLE_SUBMITTER)
                    .build();

            var user3 = User.builder()
                    .email("developer")
                    .password(passwordEncoder.encode("123"))
                    .firstName("Eleni")
                    .lastName("Antoniou")
                    .role(RoleEnum.ROLE_DEVELOPER)
                    .build();

            var user4 = User.builder()
                    .email("developer2")
                    .password(passwordEncoder.encode("123"))
                    .firstName("Nikolas")
                    .lastName("Nikolaou")
                    .role(RoleEnum.ROLE_DEVELOPER)
                    .build();

            var user5 = User.builder()
                    .email("manager")
                    .password(passwordEncoder.encode("123"))
                    .firstName("Stavrianna")
                    .lastName("Kostakou")
                    .role(RoleEnum.ROLE_MANAGER)
                    .build();


            userRepository.saveAll(List.of(user1, user2, user3, user4, user5));

            var project1 = Project.builder()
                    .title("Build a Portfolio Project")
                    .description(""" 
                            This is a mock description for building a portfolio project.
                            """)
                    .startDate(LocalDate.now())
                    .deadline(LocalDate.now().plusDays(30))
                    .owner(user1)
                    .users(Set.of(user1, user2, user3, user4, user5))
                    .priority(ProjectPriority.HIGH)
                    .build();

            var project2 = Project.builder()
                    .title("Build a Restaurant Management Application")
                    .description(""" 
                            This is a mock description for building a restaurant management application.
                            """)
                    .startDate(LocalDate.now())
                    .deadline(LocalDate.now().plusDays(40))
                    .owner(user5)
                    .users(Set.of(user1,user2, user3, user4, user5))
                    .priority(ProjectPriority.URGENT)
                    .build();

            projectRepository.saveAll(List.of(project1, project2));

            var ticket1 = Ticket.builder()
                    .name("Build the frontend of the Application")
                    .description("Decide how to build the frontend of the Application.")
                    .created(LocalDateTime.of(2024,7,22,17,34))
                    .modified(LocalDateTime.of(2024,7,22,17,34))
                    .submitted(user5)
                    .project(project1)
                    .priority(TicketPriority.HIGH)
                    .status(TicketStatus.NEW)
                    .type(TicketType.GENERAL_TASK)
                    .assigned(user3)
                    .build();

            History history1 = History.builder()
                    .date(LocalDateTime.of(2024,7,22,17,34))
                    .type(HistoryEnum.CREATED)
                    .ticket(ticket1)
                    .user(user5)
                    .build();

            historyRepository.save(history1);

            LocalDateTime ticket2Time = LocalDateTime.now();

            var ticket2 = Ticket.builder()
                    .name("Build the backend of the Application")
                    .description("This ticket tracks the development of building a backend.")
                    .created(ticket2Time)
                    .modified(ticket2Time)
                    .submitted(user5)
                    .project(project1)
                    .priority(TicketPriority.URGENT)
                    .status(TicketStatus.TESTING)
                    .type(TicketType.GENERAL_TASK)
                    .assigned(user3)
                    .build();

            History history2 = History.builder()
                    .date(ticket2Time)
                    .type(HistoryEnum.CREATED)
                    .ticket(ticket2)
                    .user(user5)
                    .build();

            historyRepository.save(history2);

            LocalDateTime ticket3Time = LocalDateTime.now().minusDays(30);

            var ticket3 = Ticket.builder()
                    .name("Implement new Reservation Feature.")
                    .description("This feature will enable users to make reservations.")
                    .created(ticket3Time)
                    .modified(ticket3Time)
                    .submitted(user4)
                    .project(project2)
                    .priority(TicketPriority.MEDIUM)
                    .status(TicketStatus.NEW)
                    .type(TicketType.NEW_DEVELOPMENT)
                    .assigned(user4)
                    .build();

            History history3 = History.builder()
                    .date(ticket3Time)
                    .type(HistoryEnum.CREATED)
                    .ticket(ticket3)
                    .user(user4)
                    .build();

            historyRepository.save(history3);

            LocalDateTime ticket4Time = LocalDateTime.now().minusDays(40);

            var ticket4 = Ticket.builder()
                    .name("Fix incorrect Timezones when submitting new order")
                    .description("When a user submits an order timezones are incorrectly saved to the database.")
                    .created(ticket4Time)
                    .modified(ticket4Time)
                    .submitted(user1)
                    .project(project2)
                    .priority(TicketPriority.URGENT)
                    .status(TicketStatus.IN_DEVELOPMENT)
                    .type(TicketType.DEFECT)
                    .assigned(null)
                    .build();

            History history4 = History.builder()
                    .date(ticket4Time)
                    .type(HistoryEnum.CREATED)
                    .ticket(ticket4)
                    .user(user1)
                    .build();

            historyRepository.save(history4);

            LocalDateTime ticket5Time = LocalDateTime.now().minusDays(2);

            var ticket5 = Ticket.builder()
                    .name("Refactor how the menu of each restaurant is fetched.")
                    .description("The menu loading of each restaurant is slow. Consider refactoring part of the codebase.")
                    .created(ticket5Time)
                    .modified(ticket5Time)
                    .submitted(user1)
                    .project(project2)
                    .priority(TicketPriority.URGENT)
                    .status(TicketStatus.RESOLVED)
                    .type(TicketType.ENHANCEMENT)
                    .assigned(null)
                    .build();

            History history5 = History.builder()
                    .date(ticket5Time)
                    .type(HistoryEnum.CREATED)
                    .ticket(ticket5)
                    .user(user1)
                    .build();

            historyRepository.save(history5);

            ticketRepository.saveAll(List.of(ticket1, ticket2, ticket3,ticket4,ticket5));
        }
    }
}
