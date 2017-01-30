package com.nananetta.framework.web.view;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nananetta.framework.domain.ManualResult;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Parameter;
import com.nananetta.framework.domain.master.PetitionQuery;
import com.nananetta.framework.domain.master.Slot;
import com.nananetta.framework.repository.ISlotRepository;
import com.nananetta.framework.repository.impl.ParameterRepository;

@Controller
@RequestMapping("/slot")
public class SlotController {

	private static final Logger LOGGER = LogManager.getLogger(SlotController.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	@Qualifier("slotRepository")
	private ISlotRepository sRepository;

	@Autowired
	@Qualifier("parameterRepository")
	private ParameterRepository pRepository;

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	@Transactional
	public @ResponseBody Result<Slot> search(@RequestBody PetitionQuery query) {
		Parameter pageSizeParam = pRepository.findByCode("PAGE_SIZE");
		Integer pageSize = Integer.parseInt(pageSizeParam.getValue());

		Parameter petitionNumLowParam = pRepository.findByCode("MAX_PETITION_PER_DAY_LOW");
		Integer petitionPerdayLow = Integer.parseInt(petitionNumLowParam.getValue());

		Parameter petitionNumHighParam = pRepository.findByCode("MAX_PETITION_PER_DAY_HIGH");
		Integer petitionPerdayHigh = Integer.parseInt(petitionNumHighParam.getValue());

		Parameter workdayThresholdParam = pRepository.findByCode("LOW_WORKDAY_THRESHOLD");
		Integer lowWorkDayThreshold = Integer.parseInt(workdayThresholdParam.getValue());

		List<Slot> result = sRepository.findAvailableWeekByBranchId(query.getBranchId(), query.getPage(), pageSize,
				petitionPerdayLow, petitionPerdayHigh, lowWorkDayThreshold);
		
		return new ManualResult<Slot>(result).buildResult();
	}

}
