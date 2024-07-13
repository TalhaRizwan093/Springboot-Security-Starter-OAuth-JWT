package com.spring.OAuthSecurity.repository;

import com.spring.OAuthSecurity.utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

@Configuration
public class HttpCookieOAuth2AutherizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    private static final String OAUTH2_AUTHERIZATION_REQUEST_COOKIE_NAME = "oauth_auth_request";
    private static final String REDIRECT_PARAM_COOKIE_NAME = "redirect_uri";
    private static final int cookieMaxAgeInSeconds = 180;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return CookieUtils.getCookie(request, OAUTH2_AUTHERIZATION_REQUEST_COOKIE_NAME)
                .map(cookie -> CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        if(authorizationRequest == null) {
            CookieUtils.deleteCookie(request, response, OAUTH2_AUTHERIZATION_REQUEST_COOKIE_NAME);
            CookieUtils.deleteCookie(request, response, REDIRECT_PARAM_COOKIE_NAME);
            return;
        }

        CookieUtils.setCookie(response, OAUTH2_AUTHERIZATION_REQUEST_COOKIE_NAME, CookieUtils.searlizeCookie(authorizationRequest), cookieMaxAgeInSeconds);
        String redirectUriAfterLogin =request.getParameter(REDIRECT_PARAM_COOKIE_NAME);
        if(redirectUriAfterLogin != null) {
            CookieUtils.setCookie(response, REDIRECT_PARAM_COOKIE_NAME, redirectUriAfterLogin, cookieMaxAgeInSeconds);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        return this.loadAuthorizationRequest(request);
    }

    public void removeAuthorizationRequestCookie(HttpServletRequest request, HttpServletResponse response) {
        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHERIZATION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_PARAM_COOKIE_NAME);
    }
}
