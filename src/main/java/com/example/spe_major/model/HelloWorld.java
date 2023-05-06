package com.example.spe_major.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HelloWorld {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String helloWorld;

    public HelloWorld() {
    }

    public HelloWorld(int id, String helloWorld) {
        this.id = id;
        this.helloWorld = helloWorld;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHelloWorld() {
        return helloWorld;
    }

    public void setHelloWorld(String helloWorld) {
        this.helloWorld = helloWorld;
    }

    @Override
    public String toString() {
        return "HelloWorld{" +
                "id=" + id +
                ", helloWorld='" + helloWorld + '\'' +
                '}';
    }
}
