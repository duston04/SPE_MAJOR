package com.example.spe_major.controller;

import com.example.spe_major.model.User;
import com.example.spe_major.services.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody User user){
        Boolean result;
        try{
            result = loginService.login(user);
        }catch(Exception exception){
            throw exception;
        }

        return ResponseEntity.ok(result);
    }

}
