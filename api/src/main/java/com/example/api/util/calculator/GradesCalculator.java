package com.example.api.util.calculator;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.OptionalDouble;

@Component
public class GradesCalculator {
    public static Double roundGrade(Double score) {
        return Math.round(score * 10.0) / 10.0;
    }

    public static Double getAvg(List<Double> numbers) {
        OptionalDouble avg = numbers
                .stream()
                .mapToDouble(d -> d)
                .average();
        if (avg.isEmpty()) return null;
        return avg.getAsDouble();
    }

    public static Double getMedian(List<Double> numbers) {
        if (numbers.isEmpty()) return null;
        boolean isEven = numbers.size() % 2 == 0;
        int medianIndex = numbers.size() / 2;

        if (isEven) {
            return (numbers.get(medianIndex - 1) + numbers.get(medianIndex)) / 2.0;
        }
        return numbers.get(medianIndex);
    }
}
