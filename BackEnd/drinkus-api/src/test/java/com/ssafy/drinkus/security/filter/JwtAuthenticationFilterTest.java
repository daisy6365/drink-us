package com.ssafy.drinkus.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.drinkus.category.service.CategoryService;
import com.ssafy.drinkus.common.type.TokenType;
import com.ssafy.drinkus.security.util.JwtUtil;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import java.util.Optional;

import static com.ssafy.drinkus.user.UserFixture.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class JwtAuthenticationFilterTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private UserService userService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp(WebApplicationContext wac) {
        JwtAuthenticationFilter jwtAuthenticationFilter = (JwtAuthenticationFilter) wac.getBean("jwtAuthenticationFilter");
        mockMvc = MockMvcBuilders
                .webAppContextSetup(wac)
                .alwaysDo(print())
                .addFilter(new CharacterEncodingFilter("UTF-8", true))
                .addFilter(jwtAuthenticationFilter)
                .build();
    }

    @Test
    @DisplayName("필터링을 한다.")
    void doFilter() throws Exception {
        // given
        String jwtToken = "Bearer " + jwtUtil.createToken(TEST_USER.getUserId(), TokenType.ACCESS_TOKEN);

        given(userRepository.findById(any()))
                .willReturn(Optional.of(TEST_USER));
        given(userService.findUserMyInfo(any()))
                .willReturn(TEST_USER_MYINFO_RESPONSE);
        // when
        mockMvc.perform(get("/api/users")
                        .header(HttpHeaders.AUTHORIZATION, jwtToken)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(TEST_USER_PROFILE_RESPONSE)));

        // then
        then(userRepository).should(times(1)).findById(any());
        then(userService).should(times(1)).findUserMyInfo(any());
    }

    @Test
    @DisplayName("JWT 토큰이 없는 요청을 필터링을 한다.")
    void doFilterNotAuthorization() throws Exception {
        // given
        String jwtToken = "bearer **";

        // when
        mockMvc.perform(get("/api/auth/refreshToken")
                        .header(HttpHeaders.AUTHORIZATION, jwtToken)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().is5xxServerError());
    }
}