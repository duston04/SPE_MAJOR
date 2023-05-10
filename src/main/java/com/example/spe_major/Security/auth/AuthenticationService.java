package com.example.spe_major.Security.auth;

import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.Security.Configuration.JwtService;
import com.example.spe_major.Security.token.Token;
import com.example.spe_major.Security.token.TokenRepository;
import com.example.spe_major.Security.token.TokenType;
import com.example.spe_major.controller.RegisterController;
import com.example.spe_major.model.User;
import com.example.spe_major.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

//    public AuthenticationResponse register(RegisterRequest request){
//        Authorization authorization = new Authorization();
//        authorization.setUsername(request.getUserId());
//        authorization.setPassword(passwordEncoder.encode(request.getPassword()));
//
//        String roleString = request.getRole().toLowerCase();
//        Role role = Role.ADMIN;
//        if(roleString.equals("super admin")){
//            role = Role.SUPER_ADMIN;
//        }
//        authorization.setRole(role);
//
//
//        Authorization savedUser = authorizationRepository.save(authorization);
//        var jwtToken = jwtService.generateToken(authorization);
//
//        saveUserToken(savedUser, jwtToken);
//
//        return AuthenticationResponse.builder()
//                .token(jwtToken)
//                .build();
//    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();

        if(user.getRole() != request.getRole()){
            logger.trace("Invalid Credentials");
            throw new ResourceNotFoundException("Invalid Credentials. Please try again with valid credentials");
        }

        var jwtToken = jwtService.generateToken(user);

        revokeAllUserTokens(user);

        saveUserToken(user, jwtToken);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        authenticationResponse.setUsername(user.getUsername());
        authenticationResponse.setToken(jwtToken);

        logger.trace("User with username : " +request.getUsername()+ " is logged in");

        return authenticationResponse;
    }

    private void revokeAllUserTokens(User user){
        Optional<User> authorization = userRepository.findByUsername(user.getUsername());
        Optional<List<Token>> validUserTokens = tokenRepository.findAllValidTokensByUserAndRevokedIsFalseAndExpiredIsFalse(authorization.get());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.get().forEach(t-> {
            t.setRevoked(true);
            t.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens.get());
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
        logger.trace("Token has been generated and saved for the user : " + user.getUsername());
    }
}
