package com.dimmil.bugtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.format.DateTimeFormatter;

@Configuration
public class UtilsConfig {

    @Bean
    public DateTimeFormatter dateTimeFormatter() {
        return DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");
    }

    @Bean
    public DateTimeFormatter dateTimeFormatterShort() {
        return DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
    }
}
