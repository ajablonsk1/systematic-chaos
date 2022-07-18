package com.example.api.util;
import org.springframework.stereotype.Component;

@Component
public class TimeCalculator {

    public long getElapsedTime(long timeStartMillis) {
        return System.currentTimeMillis() - timeStartMillis;
    }

    public long getTimeRemaining(long timeStartMillis, long timeToSolveMillis) {
        return timeToSolveMillis - getElapsedTime(timeStartMillis);
    }
}
