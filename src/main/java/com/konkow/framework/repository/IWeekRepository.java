package com.konkow.framework.repository;

import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Week;
import com.konkow.framework.exception.BusinessSQLException;

public interface IWeekRepository extends Repository<Week, Integer> {

	public Result<Week> findAll();
	
	public Week findByKey(Integer key); 
	
	public Week store(Week entity) throws BusinessSQLException;
	
	void remove(Integer key) throws BusinessSQLException;
	
}
