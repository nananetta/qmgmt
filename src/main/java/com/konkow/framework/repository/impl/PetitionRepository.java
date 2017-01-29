package com.konkow.framework.repository.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.konkow.framework.domain.HibernateResult;
import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Petition;
import com.konkow.framework.domain.master.PetitionQuery;
import com.konkow.framework.domain.master.Week;
import com.konkow.framework.repository.AbstractRepository;
import com.konkow.framework.repository.IPetitionRepository;

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
		return new HibernateResult<Petition>(sessionFactory, criteria);
	}

	public Petition store(Petition entity) {
		Petition data = findByKey(entity.getId());
		Petition result = (Petition) getSession().merge(entity);
		return result;
	}

}
