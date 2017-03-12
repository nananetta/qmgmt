package com.nananetta.framework.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nananetta.framework.domain.HibernateResult;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Week;
import com.nananetta.framework.repository.AbstractRepository;
import com.nananetta.framework.repository.IWeekRepository;

@Component
public class WeekRepository extends AbstractRepository<Week, Integer> implements IWeekRepository {

	private static final Logger LOGGER = LogManager.getLogger(WeekRepository.class);

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

	public Week findCurrentWeek() {
		String sql = "select ID, ROW_VERSION, WEEK_TEXT, START_DATE, END_DATE, NO_OF_WORKDAY, LASTUPDATE_DATE, LASTUPDATE_BY, CREATE_DATE, CREATE_BY from MWA_M_WEEK where DATE(START_DATE) <= DATE('now') AND DATE(END_DATE) >= DATE('now')";
		List<Week> result = null;
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			query.addEntity(Week.class);
			result = query.list();
			LOGGER.debug("FOUND CURRENT WEEK: "+result.size());
		} catch (Exception e) {
			LOGGER.error("CANNOT FIND CURRENT WEEK: "+e.getMessage());
		}
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
