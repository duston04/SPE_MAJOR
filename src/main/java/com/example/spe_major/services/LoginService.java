package com.example.spe_major.services;

import com.example.spe_major.Exception.ForbiddenException;
import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.model.User;
import com.example.spe_major.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginService {

    UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String login(User user){
        Optional<User> user1 = userRepository.findByUsernameAndPasswordAndRole(user.getUsername(), user.getPassword(), user.getRole());
        if(!user1.isPresent()){
            throw new ForbiddenException("User does not exist please enter a valid username/password or usertype");
        }
        return user1.get().getUsername();
    }

}
