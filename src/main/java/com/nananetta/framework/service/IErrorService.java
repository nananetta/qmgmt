package com.nananetta.framework.service;

import com.nananetta.framework.domain.ClassicError;
import com.nananetta.framework.exception.BusinessException;

public interface IErrorService {

    ClassicError getError(String errorCode);

    BusinessException createBusinessException(String errorCode);
}
