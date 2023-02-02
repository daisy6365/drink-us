package com.ssafy.drinkus.user.domain;

import com.ssafy.drinkus.common.BaseEntity;
import com.ssafy.drinkus.common.NicknameFailException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.external.nickname.RandomNickname;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.user.domain.type.UserProvider;
import com.ssafy.drinkus.user.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 무분별한 객체 생성에 대해 한번 더 체크할 수 있는 수단
@AllArgsConstructor // 모든 생성자를 구현하는 annotation
@Getter // JPA에서 lombok @Setter는 거의 쓰지 않습니다
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private String userName;

    private String userEmail;

    private String userPw;

    private String userFullname;

    private String userNickname;

    private Integer userPopularity;

    private Integer userPopularityLimit; // 5 -> 0

    private String userBirthday;

    private String userIntroduce;

    private String userImg;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private UserProvider userProvider;

    private String userProviderId;

    private Long userPoint;

    private LocalDateTime userStopDate; // 정지기한 -> 추가기능

    private Integer userSoju;

    private Integer userBeer;

    private String fcmToken;

    @OneToMany(mappedBy = "user")
    private List<Room> roomList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserSubCategory> userSubCategoryList = new ArrayList<>();


    private void defaultUserSettings() {
        try {
            userNickname = RandomNickname.makeRandomNickname();
        } catch (IOException e) {
            throw new NicknameFailException(NicknameFailException.MAKE_FAIL);
        }
        userPopularity = 0;
        userPopularityLimit = 5;
        userImg = Integer.toString((int) (Math.random() * 25) + 1);
        userPoint = 0L;
        userSoju = 0;
        userBeer = 0;
    }

    // 로컬 회원가입
    // 이메일 비밀번호 이름 생년월일
    public static User createUser(String userName, String userPw, String userFullname, String userBirthday, String userEmail) {
        User user = new User();
        user.defaultUserSettings();
        user.userName = userName;
        user.userPw = userPw;
        user.userFullname = userFullname;
        user.userBirthday = userBirthday;
        user.userEmail = userEmail;
        user.userRole = UserRole.ROLE_USER;
        user.userProvider = UserProvider.local;
        return user;
    }

    // 소셜 회원가입
    public static User createUser(UserProvider userProvider, String userProviderId, String userName, String userEmail) {
        User user = new User();
        user.defaultUserSettings();
        user.userRole = UserRole.ROLE_SOCIAL;
        user.userPw = null;
        user.userProvider = userProvider;
        user.userProviderId = userProviderId;
        user.userName = userName;
        user.userEmail = userEmail;
        return user;
    }

    // 회원수정
    // 닉네임 주량 자기소개
    public void updateUser(String userNickname, String userIntroduce, Integer userSoju, Integer userBeer, String userImg, String userBirthday, String userFullname) {
        this.userNickname = userNickname;
        this.userIntroduce = userIntroduce;
        this.userSoju = userSoju;
        this.userBeer = userBeer;
        this.userImg = userImg;
        this.userBirthday = userBirthday;
        this.userFullname = userFullname;
    }

    //비밀번호 수정
    public void updateUserPassword(String userPw) {
        this.userPw = userPw;
    }

    //인기도 수정
    public void updatePopularity(Integer popularNum) {
        this.userPopularity += popularNum;
    }

    //인기도 제한횟수 수정
    public void updatePopularityLimit() {
        this.userPopularityLimit -= 1;
    }

    //fcm토큰 재설정
    public void updateFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }
}
