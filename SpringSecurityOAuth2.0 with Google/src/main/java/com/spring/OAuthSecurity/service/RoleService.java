package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.model.UserInfo;
import com.spring.OAuthSecurity.model.UserRole;
import com.spring.OAuthSecurity.repository.RoleRepository;
import com.spring.OAuthSecurity.utils.Enums;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role getRoleByName(Enums.RoleType roleName) {
        return roleRepository.findByRole(roleName.name())
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }

    public void giveRolesToUser(UserInfo user, List<Role> roles) {
        List<UserRole> userRoles = roles.stream()
                .map(role -> UserRole.builder()
                        .role(role)
                        .userInfo(user)
                        .build())
                .collect(Collectors.toList());

        user.setUserRoles(userRoles);
    }

}
