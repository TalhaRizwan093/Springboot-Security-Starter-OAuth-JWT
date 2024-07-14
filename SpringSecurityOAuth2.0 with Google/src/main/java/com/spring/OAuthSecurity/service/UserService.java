package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.dto.LoginRequest;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserInfoRepository userInfoRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    public String addUser(UserInfo userInfo){
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        userInfoRepository.save(userInfo);
        return "User Added to System";
    }

    public ResponseEntity<?> authenticate(LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            if (auth.isAuthenticated()) {
                Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
                String jwtToken = jwtService.createToken(loginRequest.getEmail(), authorities);
                return ResponseEntity.ok().body(jwtToken);
            } else {
                throw new BadCredentialsException("Invalid username or password");
            }
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
