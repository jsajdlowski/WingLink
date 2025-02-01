package com.winglink.backend.advice;

import com.winglink.backend.service.AppUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * This advice checks if a user with a given auth0id exists, and if not, it creates a new user.
 * If the request is unauthenticated, nothing happens.
 */
@RestControllerAdvice
public class UserSyncAdvice {
    private final AppUserService appUserService;

    @Value("${auth0.audience}")
    private String authAudience;

    public UserSyncAdvice(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @ModelAttribute
    public void checkUserExists(@CurrentSecurityContext SecurityContext context) {
        Authentication authentication = context.getAuthentication();

        // Check if the request is authenticated and the principal is a JWT
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String auth0Id = jwt.getClaimAsString("sub");
//            String name = jwt.getClaimAsString("name");
            String email = jwt.getClaimAsString(authAudience + "email");

            // Fetch or create the user
            appUserService.getOrCreateUser(auth0Id, "", "", email);
        }
    }
}
