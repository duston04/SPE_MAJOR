package com.example.spe_major.controller;

import com.example.spe_major.Security.auth.AuthenticationResponse;
import com.example.spe_major.Security.auth.AuthenticationService;
import com.example.spe_major.model.User;
import com.example.spe_major.services.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    LoginService loginService;

    AuthenticationService authenticationService;

    public LoginController(LoginService loginService, AuthenticationService authenticationService) {
        this.loginService = loginService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User user){
//        String username;
//        try{
//            username = loginService.login(user);
//        }catch(Exception exception){
//            throw exception;
//        }
//
//        return ResponseEntity.ok(username);
//    }
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody User request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
