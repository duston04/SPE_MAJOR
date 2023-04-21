package com.example.spe_major.controller;

import com.example.spe_major.entities.HelloWorld;
import com.example.spe_major.repo.HelloWorldRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @Autowired
    HelloWorldRepo helloWorldRepo;

    @PostMapping("/hello/{string}")
    public String hello(@PathVariable String string){
        HelloWorld helloWorld = new HelloWorld();
        helloWorld.setHelloWorld(string);
        HelloWorld hw = helloWorldRepo.save(helloWorld);
        return hw.getHelloWorld();
    }

}
