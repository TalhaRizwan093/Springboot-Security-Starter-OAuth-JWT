package com.spring.OAuthSecurity.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.SerializationUtils;

import java.util.Base64;
import java.util.Optional;

public class CookieUtils {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name){
        Cookie[] cookies = request.getCookies();

        if(cookies != null){
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals(name)){
                    return Optional.of(cookie);
                }
            }
        }

        return Optional.empty();
    }

    public static void setCookie(HttpServletResponse response, String name, String value, int maxAge){
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name){
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals(name)){
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    cookie.setValue("");
                    response.addCookie(cookie);
                }
            }
        }
    }

    public static String searlizeCookie(Object object){
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(object));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> clas){
        return clas.cast(
                SerializationUtils.deserialize(Base64.getUrlDecoder().decode(cookie.getValue()))
        );
    }

}
