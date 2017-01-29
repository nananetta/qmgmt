package com.konkow.framework.repository;

import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Petition;
import com.konkow.framework.domain.master.PetitionQuery;
import com.konkow.framework.exception.BusinessSQLException;

public interface IPetitionRepository extends Repository<Petition, Long> {

	public Result<Petition> findAll();
	
	public Petition findByKey(Long key); 
	
	public Petition store(Petition entity) throws BusinessSQLException;
	
	void remove(Long key) throws BusinessSQLException;
	
	public Result<Petition> findByQuery(PetitionQuery query);
	
}
