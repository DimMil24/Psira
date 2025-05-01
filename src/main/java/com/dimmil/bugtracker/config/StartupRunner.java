package com.dimmil.bugtracker.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class StartupRunner {

    private final LoadData loadData;
    @Bean
    public ApplicationRunner applicationRunner(ApplicationContext ctx) {

        return args -> {
            loadData.run();
        };
    }
}
