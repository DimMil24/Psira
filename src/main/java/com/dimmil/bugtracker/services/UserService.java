package com.dimmil.bugtracker.services;

import com.dimmil.bugtracker.entities.User;
import com.dimmil.bugtracker.entities.responses.user.UserResponse;
import com.dimmil.bugtracker.exceptions.user.UserNotFoundException;
import com.dimmil.bugtracker.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserResponse> findAllUsersExceptCaller(Long userId) {
        var users = userRepository.findAll();
        var response = new ArrayList<UserResponse>();
        for (var user : users) {
            if (user.getId().equals(userId)) continue;
            response.add(
                    UserResponse.builder()
                            .id(user.getId())
                            .role(user.getRole().name())
                            .fullName(user.getFullName())
                            .build()
            );
        }
        return response;
    }

    public List<UserResponse> findAllUsersExceptOwner(UUID projectId) {
        var users = userRepository.getAllUsersExceptOwner(projectId);
        var response = new ArrayList<UserResponse>();
        for (var user : users) {
            response.add(
                    UserResponse.builder()
                            .id(user.getId())
                            .role(user.getRole().name())
                            .fullName(user.getFullName())
                            .build()
            );
        }
        return response;
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public List<User> getTop3UsersofProject(UUID projectId) {
        return userRepository.getTop3Users(projectId, PageRequest.of(0,3));
    }

    public List<User> getDevsInProject(UUID projectId) {
        return userRepository.getDevsInProject(projectId);
    }

}
