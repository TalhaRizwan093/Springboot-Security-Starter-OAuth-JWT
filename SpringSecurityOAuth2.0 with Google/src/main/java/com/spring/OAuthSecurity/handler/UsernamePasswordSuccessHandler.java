package com.spring.OAuthSecurity.handler;

import com.spring.OAuthSecurity.dto.UserInfoUserDetails;
import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import com.spring.OAuthSecurity.service.JwtTokenService;
import jakarta.servlet.ServletException;
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
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class UsernamePasswordSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenService jwtTokenService;

    private final UserInfoRepository userInfoRepository;

    public UsernamePasswordSuccessHandler(JwtTokenService jwtTokenService, UserInfoRepository userInfoRepository) {
        this.jwtTokenService = jwtTokenService;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserInfoUserDetails user = (UserInfoUserDetails) authentication.getPrincipal();
        String email = user.getUsername();
        UserInfo savedUser = userInfoRepository.findByEmail(email).orElse(null);

        if (savedUser == null) {
            throw new ServletException("User not found in the database");
        }

        List<Role> roles = savedUser.getRoles();

        Collection<? extends GrantedAuthority> authorities = roles.stream()
                                                                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                                                                .toList();

        String token = jwtTokenService.createToken(user.getUsername(), authorities);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"token\":\"" + token + "\"}");
        response.getWriter().flush();
    }
}
