package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserRole;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.repository.RoleRepository;
import com.spring.OAuthSecurity.repository.UserInfoRepository;
import com.spring.OAuthSecurity.security.oauth2.user.OAuth2UserFactory;
import com.spring.OAuthSecurity.security.oauth2.user.OAuth2UserInfo;
import com.spring.OAuthSecurity.utils.Enums;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OAuthUserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserInfoRepository userInfoRepository;


    private final RoleService roleService;

    public OAuthUserService(UserInfoRepository userInfoRepository, RoleService roleService){
        this.userInfoRepository = userInfoRepository;
        this.roleService = roleService;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> getUserFromOAuthReq = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = getUserFromOAuthReq.loadUser(userRequest);

        try{
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception ex){
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex);
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserFactory.getOAuth2User(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        if(oAuth2UserInfo.getEmail().isEmpty()){
            throw new OAuth2AuthenticationException("Email not found for the oauth user");
        }

        Optional<UserInfo> optionalUser = userInfoRepository.findByEmail(oAuth2UserInfo.getEmail());
        UserInfo user;
        if(optionalUser.isPresent()){
            user = optionalUser.get();

            if(!user.getProvider().equals(Enums.AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))){
                throw new OAuth2AuthenticationException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            updateExistingUser(user, oAuth2UserInfo);
        } else{
            registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return oAuth2User;
    }

    private void registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserInfo user = new UserInfo();
        user.setProvider(Enums.AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        updateUserDetails(user, oAuth2UserInfo);

        setRoles(user);

        userInfoRepository.save(user);
    }

    private void updateExistingUser(UserInfo existingUser, OAuth2UserInfo oAuth2UserInfo) {
        if (existingUser.getUserRoles() == null || existingUser.getUserRoles().isEmpty()) {
            setRoles(existingUser);
        }
        updateUserDetails(existingUser, oAuth2UserInfo);
        userInfoRepository.save(existingUser);
    }

    private void updateUserDetails(UserInfo user, OAuth2UserInfo oAuth2UserInfo) {
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        user.setEmailVerified((boolean)oAuth2UserInfo.getAttributes().get("email_verified"));
    }

    private void setRoles(UserInfo user) {
        List<Role> userRoles =  new ArrayList<>();
        userRoles.add(roleService.getRoleByName(Enums.RoleType.ROLE_USER));
        roleService.giveRolesToUser(user, userRoles);
    }

}
