package com.spring.OAuthSecurity.service;

import com.spring.OAuthSecurity.model.Role;
import com.spring.OAuthSecurity.repository.RoleRepository;
import com.spring.OAuthSecurity.utils.Enums;
import org.springframework.stereotype.Service;

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

}
