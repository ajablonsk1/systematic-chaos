package com.example.api.error.exception;

public class WrongPointsNumberException extends RequestValidationException {
    private Double points;
    private Double maxPoints;
    public WrongPointsNumberException(String message, Double points, Double maxPoints) {
        super(message);
        this.points = points;
        this.maxPoints = maxPoints;
    }

    @Override
    public String getLocalizedMessage() {
        return "Cannot set " + points + " when " + maxPoints + " is maximum for the task";
    }
}
