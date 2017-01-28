package com.metis.dbdwebservice.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class CustomFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
//        if (exception instanceof UsernameNotFoundException
//                && exception.getAuthentication() instanceof OpenIDAuthenticationToken) {
//            OpenIDAuthenticationToken token = (OpenIDAuthenticationToken) exception.getAuthentication();
//            if (OpenIDAuthenticationStatus.SUCCESS.equals(token.getStatus())) {
//                // getting attributes passed by google/openID provider
//                final List<OpenIDAttribute> attrList = token.getAttributes();
//                String username = (String) token.getPrincipal();
//                // provide implementation to create user from information passed from
//                // openID provider and save this user in database
//                // then redirect to redirectURL.
//                DefaultRedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
//                redirectStrategy.sendRedirect(request, response, "redirectURL");
//            } else {
//                super.onAuthenticationFailure(request, response, exception);
//            }
//        }
    }
}