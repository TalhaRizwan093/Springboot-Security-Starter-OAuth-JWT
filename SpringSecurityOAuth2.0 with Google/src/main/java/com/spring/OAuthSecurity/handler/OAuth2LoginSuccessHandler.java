package com.spring.OAuthSecurity.handler;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.HttpCookieOAuth2AutherizationRequestRepository;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import com.spring.OAuthSecurity.service.JwtTokenService;
import com.spring.OAuthSecurity.utils.CookieUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final String REDIRECT_PARAM_COOKIE_NAME = "redirect_uri";

    private final JwtTokenService jwtTokenService;

    private final UserInfoRepository userInfoRepository;
    private final HttpCookieOAuth2AutherizationRequestRepository httpCookieOAuth2AutherizationRequestRepository;

    public OAuth2LoginSuccessHandler(JwtTokenService jwtTokenService, UserInfoRepository userInfoRepository, HttpCookieOAuth2AutherizationRequestRepository httpCookieOAuth2AutherizationRequestRepository) {
        this.jwtTokenService = jwtTokenService;
        this.userInfoRepository = userInfoRepository;
        this.httpCookieOAuth2AutherizationRequestRepository = httpCookieOAuth2AutherizationRequestRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email");

        UserInfo savedUser = userInfoRepository.findByEmail(email).orElse(null);
        List<Role> roles = savedUser != null ? savedUser.getRoles() : null;

        Collection<? extends GrantedAuthority> authorities = roles != null ? roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .toList() : null;

        String token = jwtTokenService.createToken(email, authorities);

        String targetUrl = UriComponentsBuilder.fromUriString(determineTargetUrl(request, response, authentication))
                .queryParam("token", token)
                .build().toUriString();

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AutherizationRequestRepository.removeAuthorizationRequestCookie(request, response);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            try {
                throw new BadRequestException("Unauthorized Redirect URI");
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        }

        return redirectUri.orElse(getDefaultTargetUrl());

    }

    private boolean isAuthorizedRedirectUri(String url) {
        URI clientRedirectUri = URI.create(url);

        return true;
    }

    private String appendTokenToUrl(String url, String token) {
        StringBuilder urlWithToken = new StringBuilder(url);
        if (url.contains("?")) {
            urlWithToken.append("&");
        } else {
            urlWithToken.append("?");
        }
        urlWithToken.append("token=").append(token);
        return urlWithToken.toString();
    }
}
