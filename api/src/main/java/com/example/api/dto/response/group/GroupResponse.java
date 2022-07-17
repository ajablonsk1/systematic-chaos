package com.example.api.dto.response.group;

public enum GroupResponse {
    SUCCESS("SUCCESS"),
    NAME_TAKEN("NAME_TAKEN"),
    CODE_TAKEN("CODE_TAKEN");

    private final String response;

    GroupResponse(String response) {
        this.response = response;
    }

    public String getResponse(){
        return response;
    }
}
