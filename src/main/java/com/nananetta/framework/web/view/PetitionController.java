package com.nananetta.framework.web.view;

import java.util.Date;

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

import com.nananetta.framework.domain.Page;
import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.Branch;
import com.nananetta.framework.domain.master.Parameter;
import com.nananetta.framework.domain.master.Petition;
import com.nananetta.framework.domain.master.PetitionQuery;
import com.nananetta.framework.domain.master.Week;
import com.nananetta.framework.exception.BusinessException;
import com.nananetta.framework.repository.IPetitionRepository;
import com.nananetta.framework.repository.IWeekRepository;
import com.nananetta.framework.repository.impl.ParameterRepository;
import com.nananetta.framework.repository.impl.SimpleDomainRepository;

@Controller
@RequestMapping("/petition")
public class PetitionController {

	private static final Logger LOGGER = LogManager.getLogger(PetitionController.class);

	@Autowired
    private SessionFactory sessionFactory;

	@Autowired
	@Qualifier("petitionRepository")
	private IPetitionRepository pRepository;

	@Autowired
	@Qualifier("weekRepository")
	private IWeekRepository wRepository;

	@Autowired
    private SimpleDomainRepository sdRepository;

	@Autowired
	@Qualifier("parameterRepository")
	private ParameterRepository pmRepository;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	@Transactional
	public @ResponseBody Result<Petition> getById() {
		Result<Petition> result = pRepository.findAll();
		return result.buildResult();
	}
	
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @Transactional
    public @ResponseBody Page<Petition> search(@RequestBody PetitionQuery query) {
        Result<Petition> result = pRepository.findByQuery(query);
        return result.buildResult().getPage(query.getPage());
    }
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @Transactional
    public @ResponseBody Petition save(@RequestBody Petition petition) {
    	
    	petition.setPetitionDate(new Date(System.currentTimeMillis()));
    	// find branch object
    	Branch branch = (Branch) sdRepository.findByKey(Branch.class, petition.getBranch().getId());
    	petition.setBranch(branch);
    	
    	// Find week object
    	Week week = wRepository.findByKey(petition.getWeek().getId());
    	petition.setWeek(week);
    	
    	// Check availability
    	PetitionQuery pQuery = new PetitionQuery();
    	pQuery.setBranchId(petition.getBranch().getId());
    	pQuery.setWeekId(petition.getWeek().getId());
    	Result<Petition> presult = pRepository.findByQuery(pQuery);
    	long size = presult.buildResult().getTotal();
    	
		Parameter petitionNumLowParam = pmRepository.findByCode("MAX_PETITION_PER_DAY_LOW");
		Integer maxPetitionPerdayLow = Integer.parseInt(petitionNumLowParam.getValue());

		Parameter petitionNumHighParam = pmRepository.findByCode("MAX_PETITION_PER_DAY_HIGH");
		Integer maxPetitionPerdayHigh = Integer.parseInt(petitionNumHighParam.getValue());

		Parameter workdayThresholdParam = pmRepository.findByCode("LOW_WORKDAY_THRESHOLD");
		Integer lowWorkDayThreshold = Integer.parseInt(workdayThresholdParam.getValue());

		int maxPetitionPerday = 0;
		if(week.getNoOfWorkday() <= lowWorkDayThreshold) {
			maxPetitionPerday = maxPetitionPerdayLow;
		} else {
			maxPetitionPerday = maxPetitionPerdayHigh;
		}
		if(size < maxPetitionPerday) {
	        Petition result = pRepository.store(petition);
	        return result;
		} else {
			LOGGER.error("คำร้องเต็ม ในช่วงเวลาที่ระบุ");
			throw new BusinessException("ERR-001", "คำร้องเต็ม ในช่วงเวลาที่ระบุ");
		}
    }
    
}
