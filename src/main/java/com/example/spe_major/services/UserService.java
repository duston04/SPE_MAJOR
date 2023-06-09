package com.example.spe_major.services;

import com.example.spe_major.Exception.ForbiddenException;
import com.example.spe_major.model.User;
import com.example.spe_major.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserService {
    UserRepository userRepository;

    Logger logger = LoggerFactory.getLogger(UserRepository.class);

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void checkIfUserIdExists(String username){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            logger.trace("EXCEPTION : Another User with the given username exists");
            throw new ForbiddenException("User already exists. Please try again with a different User id");
        }
    }

}
