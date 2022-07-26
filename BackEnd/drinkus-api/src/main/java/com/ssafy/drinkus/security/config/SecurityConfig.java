package com.ssafy.drinkus.security.config;

import com.ssafy.drinkus.security.filter.JwtAuthorizationFilter;
import com.ssafy.drinkus.security.handler.CustomSimpleRulAuthenticationSuccessHandler;
import com.ssafy.drinkus.security.service.CustomOAuth2UserService;
import com.ssafy.drinkus.security.service.CustomUserDetailsService;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration //설정파일임을 알려줌
@RequiredArgsConstructor // final이 달려있는 애들만
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터 체인에 등록이 됨
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true)
// 보안관련 설정사항들이 있음
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final CustomSimpleRulAuthenticationSuccessHandler customSimpleRulAuthenticationSuccessHandler;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/docs/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .formLogin().disable() // 서버의 로그인 폼으로 로그인하는 형태가 아니고 우리는 단지 토큰만을 전달
                .httpBasic().disable()
                .cors().configurationSource(corsConfigurationSource()) // @CrossOrigin 어노테이션으로 걸면 인증이 필요한 요청까지 인증 없이 전부 허용해버리게 됨
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션, 쿠키를 만들지 않고 stateless한 서버를 만들겠다
                .and()
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), jwtUtil, userRepository))
                .authorizeRequests()
                .antMatchers("/ws-stomp/**", "/api/port", "/actuator/health").permitAll()
                .antMatchers(HttpMethod.GET, "users/id").permitAll()
                .antMatchers(HttpMethod.POST, "/users/join", "/users/login", "/users/join/id").permitAll()
                .anyRequest().hasAnyRole("USER", "ADMIN", "SOCIAL")
                .and()
                // 여기부터 소셜로그인용 security 설정.
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(new SimpleUrlAuthenticationSuccessHandler() {

                })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                        // 실패할 시 에러 인증 실패 에러 전송
                        System.out.println("SecurityConfig.onAuthenticationFailure");
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                    }
                });
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*"); // 모든 IP에 응답 허용
        configuration.addAllowedHeader("*"); // 모든 헤더에 응답 허용
        configuration.addAllowedMethod("*"); // 모든 POST,GEt 등등 응답 허용
        configuration.setAllowCredentials(true); // 서버가 응답할 때 json을 js에서 처리할 수 있도록 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean //수동bean 등록
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
