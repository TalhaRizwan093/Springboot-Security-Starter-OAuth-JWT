package com.spring.OAuthSecurity.security.oauth2.user;

import com.spring.OAuthSecurity.utils.Enums;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import java.util.Map;

public class OAuth2UserFactory {

    public static OAuth2UserInfo getOAuth2User(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(Enums.AuthProvider.google.toString())){
            return new GoogleOAuth2UserInfo(attributes);
        }else if(registrationId.equalsIgnoreCase((Enums.AuthProvider.github.toString()))){
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }

}
