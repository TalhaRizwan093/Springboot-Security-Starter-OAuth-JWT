package com.spring.OAuthSecurity.handler;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import com.spring.OAuthSecurity.service.JwtTokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenService jwtTokenService;

    private final UserInfoRepository userInfoRepository;

    public OAuth2LoginSuccessHandler(JwtTokenService jwtTokenService, UserInfoRepository userInfoRepository) {
        this.jwtTokenService = jwtTokenService;
        this.userInfoRepository = userInfoRepository;
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

        String redirectUrl = request.getHeader("referer");
        if (redirectUrl != null && !redirectUrl.isEmpty()) {
            redirectUrl = appendTokenToUrl(redirectUrl, token);
        }

        response.sendRedirect(redirectUrl != null ? redirectUrl : "/");
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
