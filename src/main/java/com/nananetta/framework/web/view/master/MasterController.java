package com.nananetta.framework.web.view.master;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.master.AbstractSimpleDomain;
import com.nananetta.framework.domain.master.Branch;
import com.nananetta.framework.repository.impl.SimpleDomainRepository;

@Controller
@RequestMapping(value = "/master")
public class MasterController {

	@Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private SimpleDomainRepository sdRepository;

    @RequestMapping(value = "/branch/getAll", method = RequestMethod.GET)
    @Transactional
    public @ResponseBody Result<AbstractSimpleDomain> getAllBranchValue() {
        Result<AbstractSimpleDomain> result = sdRepository.findAll(Branch.class);
//        List<AbstractSimpleDomain> l = result.getFullResult().getList();
        return result.buildResult();
//        return result.getList();
    }

}
