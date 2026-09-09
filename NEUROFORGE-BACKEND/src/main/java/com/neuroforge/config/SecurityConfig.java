package com.neuroforge.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5176",
                        "https://neuroforge-frontend-chi.vercel.app"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable())

                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // PUBLIC
                        // =========================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/logout"
                        ).permitAll()


                        // =========================
                        // READ ACCESS
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/projects/**",
                                "/api/requirements/**",
                                "/api/userstories/**",
                                "/api/testcases/**",
                                "/api/bugs/**",
                                "/api/tasks/**",
                                "/api/sprints/**",
                                "/api/pipelines/**",
                                "/api/builds/**",
                                "/api/deployments/**",
                                "/api/repositories/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "DEVELOPER",
                                "TESTER",
                                "DEVOPS",
                                "VIEWER"
                        )


                        // =========================
                        // ADMIN
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/users/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "DEVELOPER",
                                "TESTER",
                                "DEVOPS",
                                "VIEWER"
                        )

                        .requestMatchers(
                                "/api/users/**",
                                "/api/roles/**"
                        ).hasRole("ADMIN")


                        // =========================
                        // PROJECT MANAGER
                        // =========================

                        .requestMatchers(
                                "/api/projects/**",
                                "/api/requirements/**",
                                "/api/userstories/**",
                                "/api/sprints/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )


                        // =========================
                        // DEVELOPER
                        // =========================

                        .requestMatchers(
                                "/api/tasks/**",
                                "/api/repositories/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "DEVELOPER"
                        )


                        // =========================
                        // TESTER
                        // =========================

                        .requestMatchers(
                                "/api/testcases/**",
                                "/api/bugs/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "TESTER"
                        )


                        // =========================
                        // DEVOPS
                        // =========================

                        .requestMatchers(
                                "/api/pipelines/**",
                                "/api/builds/**",
                                "/api/deployments/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "DEVOPS"
                        )


                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest().authenticated()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.IF_REQUIRED
                        )
                );

        return http.build();
    }
}