package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.dto.LoginRequest;
import com.spring.OAuthSecurity.dto.SignupRequest;
import com.spring.OAuthSecurity.exception.user.UserRegistrationException;
import com.spring.OAuthSecurity.mapper.UserMapper;
import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.model.UserRole;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import com.spring.OAuthSecurity.utils.Enums;
import jakarta.transaction.Transactional;
import org.mapstruct.factory.Mappers;
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
import org.springframework.web.context.annotation.RequestScope;

import java.beans.Transient;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    final UserInfoRepository userInfoRepository;
    final PasswordEncoder passwordEncoder;
    final JwtTokenService jwtService;
    final AuthenticationManager authenticationManager;
    final RoleService roleService;
    final UserMapper mapper;

    public UserService(AuthenticationManager authenticationManager, JwtTokenService jwtService, PasswordEncoder passwordEncoder, UserInfoRepository userInfoRepository, RoleService roleService, UserMapper mapper) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userInfoRepository = userInfoRepository;
        this.roleService = roleService;
        this.mapper = mapper;
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

    public ResponseEntity<?> register(SignupRequest signupRequest) {
        try{
            UserInfo user = mapper.singupRequestDtoToUserInfo(signupRequest);
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            user.setProvider(Enums.AuthProvider.local);
            user.setProviderId("LOCAL");
            user.setEmailVerified(false);
            user.setImageUrl(null);
            List<Role> roles = new ArrayList<>();
            roles.add(roleService.getRoleByName(Enums.RoleType.ROLE_USER));
            roleService.giveRolesToUser(user, roles);
            userInfoRepository.save(user);
            return ResponseEntity.ok().body("Registration Successful");

        }catch (Exception e){
            throw new UserRegistrationException("Invalid Registration Request");
        }
    }

}
