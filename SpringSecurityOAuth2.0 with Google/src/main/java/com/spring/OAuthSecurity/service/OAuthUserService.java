package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.RoleRepository;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OAuthUserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserInfoRepository userInfoRepository;

    private final RoleRepository roleRepository;

    public OAuthUserService(UserInfoRepository userInfoRepository, RoleRepository roleRepository){
        this.userInfoRepository = userInfoRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> getUserFromOAuthReq = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = getUserFromOAuthReq.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(email);

        UserInfo user;
        if (userOptional.isEmpty()) {
            user = new UserInfo();
            user.setEmail(email);
            user.setUsername(oAuth2User.getAttribute("name"));
            user.setPassword("");

            List<Role> roles = new ArrayList<>();
            Role role = new Role();
            role.setRoleName("ROLE_USER");
            role.setUserInfo(user);
            roles.add(role);
            user.setRoles(roles);

            userInfoRepository.save(user);
            roleRepository.saveAll(roles);
        } else {
            // If user exists, update their details
            user = userOptional.get();
            user.setUsername(oAuth2User.getAttribute("name"));

            // Update roles if necessary
            List<Role> roles = user.getRoles();
            if (roles == null || roles.isEmpty()) {
                roles = new ArrayList<>();
                Role role = new Role();
                role.setRoleName("ROLE_USER");
                role.setUserInfo(user);
                roles.add(role);
                user.setRoles(roles);
                roleRepository.saveAll(roles);
            }
            userInfoRepository.save(user);
        }

        return oAuth2User;
    }
}
