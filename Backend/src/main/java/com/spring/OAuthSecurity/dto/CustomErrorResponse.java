package com.spring.OAuthSecurity.dto;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.lang.Nullable;
import org.springframework.web.ErrorResponse;

import java.net.URI;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class CustomErrorResponse implements ErrorResponse {

    private final HttpStatusCode statusCode;
    private final ProblemDetail problemDetail;
    private final Map<String, String> errors;
    private final String errorType; // New field

    public CustomErrorResponse(HttpStatusCode statusCode, ProblemDetail problemDetail, Map<String, String> errors, String errorType) {
        this.statusCode = statusCode;
        this.problemDetail = problemDetail;
        this.errors = errors;
        this.errorType = errorType; // Initialize the new field
    }

    @Override
    public HttpStatusCode getStatusCode() {
        return statusCode;
    }

    @Override
    public ProblemDetail getBody() {
        return problemDetail;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public String getErrorType() { // Getter for errorType
        return errorType;
    }

    @Override
    public ProblemDetail updateAndGetBody(@Nullable MessageSource messageSource, Locale locale) {
        if (messageSource != null) {
            String type = messageSource.getMessage(this.getTypeMessageCode(), (Object[]) null, (String) null, locale);
            if (type != null) {
                this.getBody().setType(URI.create(type));
            }

            Object[] arguments = this.getDetailMessageArguments(messageSource, locale);
            String detail = messageSource.getMessage(this.getDetailMessageCode(), arguments, (String) null, locale);
            if (detail != null) {
                this.getBody().setDetail(detail);
            }

            String title = messageSource.getMessage(this.getTitleMessageCode(), (Object[]) null, (String) null, locale);
            if (title != null) {
                this.getBody().setTitle(title);
            }
        }

        return this.getBody();
    }
}
