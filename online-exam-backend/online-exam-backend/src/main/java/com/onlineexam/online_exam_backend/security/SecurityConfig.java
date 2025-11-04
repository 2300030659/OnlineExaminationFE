package com.onlineexam.online_exam_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // disable CSRF for simplicity (only for development)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/hello", "/api/users/**").permitAll() // allow these
                .anyRequest().authenticated() // everything else needs auth
            )
            .formLogin().disable() // disable Spring's default login form
            .httpBasic().disable(); // disable basic auth
        return http.build();
    }
}
