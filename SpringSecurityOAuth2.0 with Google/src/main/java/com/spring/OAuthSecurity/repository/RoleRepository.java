package com.spring.OAuthSecurity.repository;

import com.spring.OAuthSecurity.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRole(String name);
}
