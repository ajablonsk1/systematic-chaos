package com.example.api.util.calculator;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
public class TimeParser {

    public long parseAndGetTimeMillisFromDate(SimpleDateFormat format, String expireDate) throws ParseException {
        return format.parse(expireDate).getTime();
    }

    public long parseAndGetTimeMillisFromHour(SimpleDateFormat format, String hour) throws ParseException {
        Date date = format.parse(hour);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);
        return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000;
    }
}
