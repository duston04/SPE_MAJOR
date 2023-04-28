package com.example.spe_major.controller;

import com.example.spe_major.entities.HelloWorld;
import com.example.spe_major.repo.HelloWorldRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/helloprint")
    public List<String> print(){
        List<HelloWorld> helloWorldList = helloWorldRepo.findAll();
        List<String> stringList = new ArrayList<>();
        for(int i=0; i<helloWorldList.size(); i++){
            stringList.add(helloWorldList.get(i).getHelloWorld());
        }
        return stringList;
    }

}
