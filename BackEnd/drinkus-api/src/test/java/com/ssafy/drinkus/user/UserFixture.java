package com.ssafy.drinkus.user;

import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserSubCategory;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import com.ssafy.drinkus.user.domain.type.UserRole;
import com.ssafy.drinkus.user.response.UserProfileResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserFixture {

    public static final Long TEST_USER_ID = 1L;
    public static final String TEST_USER_NAME = "이름";
    public static final String TEST_USER_EMAIL = "이메일";
    public static final String TEST_USER_PW = "비밀번호";
    public static final String TEST_USER_FULLNAME = "이름";
    public static final String TEST_USER_NICKNAME = "닉네임";
    public static final Integer TEST_USER_POPULARITY = 1;
    public static final Integer TEST_USER_POPULARITY_LIMIT = 5; // 5 -> 0
    public static final String TEST_USER_BIRTHDAY = "20230202";
    public static final String TEST_USER_INTRODUCE = "소개";
    public static final String TEST_USER_IMG = "이미지";
    public static final UserRole TEST_USER_ROLE = UserRole.ROLE_USER;
    public static final UserProvider TEST_USER_PROVIDER = UserProvider.kakao;
    public static final String TEST_USER_PROVIDER_ID = "ID";
    public static final Long TEST_USER_POINT = 1L;
    public static final LocalDateTime TEST_USER_STOPDATE = LocalDateTime.now(); // 정지기한 -> 추가기능
    public static final Integer TEST_USER_SOJU = 1;
    public static final Integer TEST_USER_BEER = 1;
    public static final String TEST_FCM_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjQyNTc3NjMyLCJleHAiOjE2NDI2NjQwMzJ9.nzIasjShYVOAVnPACqUmJMiHLpHyN26vJo4q6NuePg0";
    public static final List<Room> TEST_ROOM_LIST = new ArrayList<>();
    public static final List<UserSubCategory> TEST_USER_SUBCATEGORY = new ArrayList<>();

    public static final User TEST_USER = new User(TEST_USER_ID, TEST_USER_NAME, TEST_USER_EMAIL, TEST_USER_PW, TEST_USER_FULLNAME, TEST_USER_NICKNAME, TEST_USER_POPULARITY, TEST_USER_POPULARITY_LIMIT, TEST_USER_BIRTHDAY
            , TEST_USER_INTRODUCE, TEST_USER_IMG, TEST_USER_ROLE, TEST_USER_PROVIDER, TEST_USER_PROVIDER_ID, TEST_USER_POINT, TEST_USER_STOPDATE, TEST_USER_SOJU, TEST_USER_BEER, TEST_FCM_TOKEN, TEST_ROOM_LIST, TEST_USER_SUBCATEGORY);

    public static final User TEST_USER2 = new User(TEST_USER_ID, TEST_USER_NAME, TEST_USER_EMAIL, TEST_USER_PW, TEST_USER_FULLNAME, TEST_USER_NICKNAME, TEST_USER_POPULARITY, TEST_USER_POPULARITY_LIMIT, TEST_USER_BIRTHDAY
            , TEST_USER_INTRODUCE, TEST_USER_IMG, TEST_USER_ROLE, TEST_USER_PROVIDER, TEST_USER_PROVIDER_ID, TEST_USER_POINT, TEST_USER_STOPDATE, TEST_USER_SOJU, TEST_USER_BEER, TEST_FCM_TOKEN, TEST_ROOM_LIST, TEST_USER_SUBCATEGORY);

    public static final UserProfileResponse TEST_USER_PROFILE_RESPONSE = new UserProfileResponse(TEST_USER_NICKNAME, TEST_USER_POPULARITY, TEST_USER_INTRODUCE, TEST_USER_IMG, TEST_USER_SOJU, TEST_USER_BEER);
}
