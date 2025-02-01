package com.winglink.backend.config.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Provides a method to get user's auth0 id from security context (from JWT)
 */
public class SecurityUtils {
    public static String getAuth0UserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt.getClaimAsString("sub");
    }
}