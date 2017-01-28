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

import com.konkow.framework.domain.Page;
import com.konkow.framework.domain.Result;
import com.konkow.framework.domain.master.Petition;
import com.konkow.framework.domain.master.PetitionQuery;
import com.konkow.framework.repository.IPetitionRepository;

@Controller
@RequestMapping("/petition")
public class PetitionController {

	private static final Logger LOGGER = LogManager.getLogger(PetitionController.class);

	@Autowired
    private SessionFactory sessionFactory;

	@Autowired
	@Qualifier("petitionRepository")
	private IPetitionRepository pRepository;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	@Transactional
	public @ResponseBody Result<Petition> getById() {
		Result<Petition> result = pRepository.findAll();
		return result.buildResult();
	}
	
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @Transactional
    public @ResponseBody Page<Petition> search(PetitionQuery query) {
        Result<Petition> result = pRepository.findByQuery(query);
        return result.buildResult().getPage(query.getPage());
    }


}
