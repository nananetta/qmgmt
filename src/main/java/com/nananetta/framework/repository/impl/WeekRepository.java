package com.nananetta.framework.repository.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nananetta.framework.domain.HibernateResult;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Week;
import com.nananetta.framework.repository.AbstractRepository;
import com.nananetta.framework.repository.IWeekRepository;
import com.nananetta.framework.web.view.WeekController;

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
		Criteria criteria = createCriteria(Week.class);
		Date currDate = new Date(System.currentTimeMillis());
		criteria.add(Restrictions.lt("startDate", currDate));
		criteria.add(Restrictions.gt("endDate", currDate));
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
