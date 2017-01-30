package com.nananetta.framework.repository;

import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Week;
import com.nananetta.framework.exception.BusinessSQLException;

public interface IWeekRepository extends Repository<Week, Integer> {

	public Result<Week> findAll();
	
	public Week findByKey(Integer key); 
	
	public Week store(Week entity) throws BusinessSQLException;
	
	void remove(Integer key) throws BusinessSQLException;
	
}
