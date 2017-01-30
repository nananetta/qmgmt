package com.nananetta.framework.repository;

import java.io.Serializable;

import com.nananetta.framework.domain.IDomain;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.exception.BusinessSQLException;

public interface Repository<E extends IDomain<K>, K extends Serializable> {

	Result<E> findAll();
	
	E findByKey(K key); 
	
	E store(E entity) throws BusinessSQLException;
	
	void remove(K key) throws BusinessSQLException;
}
