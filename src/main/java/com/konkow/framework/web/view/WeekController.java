package com.konkow.framework.web.view;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Week;
import com.konkow.framework.repository.IWeekRepository;

@Controller
@RequestMapping("/week")
public class WeekController {

	private static final Logger LOGGER = LogManager.getLogger(WeekController.class);

	@Autowired
    private SessionFactory sessionFactory;

	@Autowired
	@Qualifier("weekRepository")
	private IWeekRepository wRepository;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	@Transactional
	public @ResponseBody Result<Week> getById() {
		Result<Week> result = wRepository.findAll();
		return result.buildResult();
	}

}
