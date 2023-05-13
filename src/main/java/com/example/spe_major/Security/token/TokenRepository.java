package com.example.spe_major.Security.token;

import com.example.spe_major.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {


    Optional<List<Token>> findAllValidTokensByUserAndRevokedIsFalseAndExpiredIsFalse(User user);

    Optional<Token> findByToken(String token);
}