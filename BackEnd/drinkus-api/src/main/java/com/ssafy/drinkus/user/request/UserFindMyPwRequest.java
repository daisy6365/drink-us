package com.ssafy.drinkus.user.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFindMyPwRequest {
    @Email(message = "이메일 형식에 맞춰주세요")
    private String userName;
}
