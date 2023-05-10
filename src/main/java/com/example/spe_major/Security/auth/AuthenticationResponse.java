package com.example.spe_major.Security.auth;

public class AuthenticationResponse {
    private String token;
    private String username;

    public AuthenticationResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public AuthenticationResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "token='" + token + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
