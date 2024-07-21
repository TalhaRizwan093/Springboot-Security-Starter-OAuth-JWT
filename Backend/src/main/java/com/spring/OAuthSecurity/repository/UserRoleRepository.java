package com.spring.OAuthSecurity.repository;

import com.spring.OAuthSecurity.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
