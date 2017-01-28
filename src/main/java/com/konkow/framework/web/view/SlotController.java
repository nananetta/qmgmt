package com.konkow.framework.web.view;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.konkow.framework.domain.master.Parameter;
import com.konkow.framework.domain.master.Slot;
import com.konkow.framework.repository.ISlotRepository;
import com.konkow.framework.repository.impl.ParameterRepository;

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

	@RequestMapping(value = "/search", method = RequestMethod.GET)
    @Transactional
    public @ResponseBody List<Slot> search(@RequestParam Integer branchId, @RequestParam (value = "page", required = false) Integer page) {
    	Parameter pageSizeParam = pRepository.findByCode("PAGE_SIZE");
    	Integer pageSize = Integer.parseInt(pageSizeParam.getValue());
    	
    	Parameter petitionNumParam = pRepository.findByCode("MAX_PETITION_PER_DAY");
    	Integer petitionPerday = Integer.parseInt(petitionNumParam.getValue());
    	
        List<Slot> result = sRepository.findAvailableWeekByBranchId(branchId, page, pageSize, petitionPerday);
        return result;
    }


}
