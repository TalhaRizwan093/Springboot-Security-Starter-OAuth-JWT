package com.spring.OAuthSecurity.repository;

import com.spring.OAuthSecurity.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
