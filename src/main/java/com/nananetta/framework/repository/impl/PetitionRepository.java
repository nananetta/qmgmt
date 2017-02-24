package com.nananetta.framework.repository.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nananetta.framework.domain.HibernateResult;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Petition;
import com.nananetta.framework.domain.master.PetitionQuery;
import com.nananetta.framework.domain.master.Week;
import com.nananetta.framework.repository.AbstractRepository;
import com.nananetta.framework.repository.IPetitionRepository;

@Component
public class PetitionRepository extends AbstractRepository<Petition, Long> implements IPetitionRepository {

	@Autowired
	private SessionFactory sessionFactory;

	public void remove(Long key) {
		Petition data = findByKey(key);
		getSession().delete(data);
	}

	public Result<Petition> findAll() {
		Criteria criteria = createCriteria(Petition.class);
		criteria.setCacheable(true);
		return new HibernateResult<Petition>(sessionFactory, criteria);
	}

	public Petition findByKey(Long key) {
		Criteria criteria = createCriteria(Week.class);
		criteria.add(Restrictions.eq("id", key));
		List<Petition> result = criteria.list();
		if (result != null && result.size() > 0) {
			return result.get(0);
		} else {
			return null;
		}
	}

	public Result<Petition> findByQuery(PetitionQuery query) {
		Criteria criteria = createCriteria(Petition.class);
		if (query.getBranchId() != null) {
			criteria = criteria.add(Restrictions.eq("branch.id", query.getBranchId()));
		}
		if (query.getWeekId() != null) {
			criteria = criteria.add(Restrictions.eq("week.id", query.getWeekId()));
		}
		if (query.getAccountNo() != null) {
			criteria = criteria.add(Restrictions.eq("accountNo", query.getAccountNo()));
		}
		return new HibernateResult<Petition>(sessionFactory, criteria);
	}

	public Petition store(Petition entity) {
		Petition data = findByKey(entity.getId());
		Petition result = (Petition) getSession().merge(entity);
		return result;
	}

}
