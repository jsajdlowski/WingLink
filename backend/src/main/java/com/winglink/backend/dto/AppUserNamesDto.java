package com.winglink.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.winglink.backend.entity.AppUser}
 */
@Value
public class AppUserNamesDto implements Serializable {
    @NotEmpty
    String firstName;
    @NotEmpty
    String lastName;
}