package com.nananetta.framework.web;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.nananetta.framework.domain.HibernateAwareObjectMapper;
import com.nananetta.framework.exception.BusinessException;
import com.nananetta.framework.exception.BusinessSQLException;
import com.nananetta.framework.exception.UnauthorizedException;

@ControllerAdvice
public class ExceptionHandlingController {

    private static final Logger LOGGER = LogManager.getLogger(ExceptionHandlingController.class);
    
    @Autowired
    private HibernateAwareObjectMapper mapper;

    @ExceptionHandler(BusinessException.class)
    public void handleBusinessException(HttpServletResponse response, BusinessException ex) {
        try {
            String json = mapper.writeValueAsString(ex);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    @ExceptionHandler(UnauthorizedException.class)
    public void handleAuthorizationException(HttpServletResponse response, UnauthorizedException ex) {
        try {
            String json = mapper.writeValueAsString(ex);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }
    
    @ExceptionHandler(BusinessSQLException.class)
    public void handleBusinessSQLException(HttpServletResponse response, BusinessSQLException ex) {
        try {
            String json = mapper.writeValueAsString(ex);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

}
