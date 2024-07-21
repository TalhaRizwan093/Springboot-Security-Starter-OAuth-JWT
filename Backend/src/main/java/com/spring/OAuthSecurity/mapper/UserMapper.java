package com.spring.OAuthSecurity.mapper;

import com.spring.OAuthSecurity.dto.SignupRequest;
import com.spring.OAuthSecurity.model.UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserInfo singupRequestDtoToUserInfo(SignupRequest signupRequest);
    SignupRequest userInfoToSignupRequest(UserInfo userInfo);

}
