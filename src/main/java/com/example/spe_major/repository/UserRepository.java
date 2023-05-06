package com.example.spe_major.repository;

import com.example.spe_major.model.Role;
import com.example.spe_major.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndPasswordAndRole(String username, String password, Role role);
}
