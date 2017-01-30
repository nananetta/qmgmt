package com.nananetta.framework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nananetta.framework.domain.ClassicError;
import com.nananetta.framework.exception.BusinessException;
import com.nananetta.framework.repository.impl.SimpleDomainRepository;
import com.nananetta.framework.service.IErrorService;

@Service
public class ErrorService implements IErrorService {

    @Autowired
    private SimpleDomainRepository repository;

    public ClassicError getError(String errorCode) {
        ClassicError result = (ClassicError) repository.findByCode(ClassicError.class, errorCode);
        return result;
    }

    public BusinessException createBusinessException(String errorCode) {
        errorCode = errorCode == null ? "" : errorCode.toUpperCase();
        ClassicError error = getError(errorCode);
        String errorText = null;
        if (error != null) {
            errorText = error.getDescription();
        }
        throw new BusinessException(errorCode, errorText);
    }

}
