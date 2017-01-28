package com.konkow.framework.repository.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.konkow.framework.domain.HibernateResult;
import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Week;
import com.konkow.framework.repository.AbstractRepository;
import com.konkow.framework.repository.IWeekRepository;

@Component
public class WeekRepository extends AbstractRepository<Week, Integer> implements IWeekRepository {

	@Autowired
	private SessionFactory sessionFactory;

	public void remove(Integer key) {
		Week data = findByKey(key);
		getSession().delete(data);
	}

	public Result<Week> findAll() {
		Criteria criteria = createCriteria(Week.class);
		criteria.setCacheable(true);
		return new HibernateResult<Week>(sessionFactory, criteria);
	}

	public Week findByKey(Integer key) {
		Criteria criteria = createCriteria(Week.class);
		criteria.add(Restrictions.eq("id", key));
		List<Week> result = criteria.list();
		if (result != null && result.size() > 0) {
			return result.get(0);
		} else {
			return null;
		}
	}

	public Week store(Week entity) {
		Week data = findByKey(entity.getId());
		Week result = (Week) getSession().merge(entity);
		return result;
	}
	
}
