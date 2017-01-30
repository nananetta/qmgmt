package com.nananetta.framework.repository;

import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Petition;
import com.nananetta.framework.domain.master.PetitionQuery;
import com.nananetta.framework.exception.BusinessSQLException;

public interface IPetitionRepository extends Repository<Petition, Long> {

	public Result<Petition> findAll();
	
	public Petition findByKey(Long key); 
	
	public Petition store(Petition entity) throws BusinessSQLException;
	
	void remove(Long key) throws BusinessSQLException;
	
	public Result<Petition> findByQuery(PetitionQuery query);
	
}
