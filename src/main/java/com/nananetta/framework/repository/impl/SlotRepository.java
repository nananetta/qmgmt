package com.nananetta.framework.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nananetta.framework.domain.master.Slot;
import com.nananetta.framework.repository.ISlotRepository;

@Component
public class SlotRepository implements ISlotRepository {

	private static final Logger LOGGER = LogManager.getLogger(SlotRepository.class);
	
    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }
	
	public List<Slot> findAvailableWeekByBranchId(Integer branchId, Integer page, Integer pageSize, Integer maxPetitionPerdayLow, Integer maxPetitionPerdayHigh, Integer lowWorkDayThreshold) {
		
		if(page==null) {
			page = 1;
		}
		
		Query query = getSession().createSQLQuery("SELECT w.ID, w.WEEK_TEXT, w.NO_OF_WORKDAY, CASE WHEN p.NUM_COUNT IS NOT NULL THEN p.NUM_COUNT ELSE 0 END AS NUM_COUNT "
				+ " FROM MWA_M_WEEK AS w "
				+ " LEFT OUTER JOIN ( SELECT count(pe.ID) AS NUM_COUNT, pe.WEEK_ID FROM MWA_M_PETITION AS pe WHERE pe.BRANCH_ID = ? GROUP BY pe.WEEK_ID) AS p ON w.ID = p.WEEK_ID"
				+ " WHERE CURRENT_DATE < w.END_DATE LIMIT ?")
				.addScalar("ID", IntegerType.INSTANCE)
				.addScalar("WEEK_TEXT", StringType.INSTANCE)
				.addScalar("NO_OF_WORKDAY", IntegerType.INSTANCE)
				.addScalar("NUM_COUNT", IntegerType.INSTANCE);
		
		page = page < 1 ? 1 : page;
//        int startIndex = (page - 1) * pageSize; // Start from 0
//        int noOfPage = (int) Math.ceil((double) (total) / pageSize);
        
        int noOfRow =  page * pageSize;
		List<Slot> slotList = new ArrayList<Slot>();
		query.setParameter(0, branchId);
		query.setParameter(1, noOfRow);
		List<Object[]> rows = query.list();
		for(Object[] row : rows){
			Slot slot = new Slot();
			slot.setWeekId(Integer.parseInt(row[0].toString()));
			slot.setWeekText(row[1].toString());
			slot.setNoOfWorkday(Integer.parseInt(row[2].toString()));
			int numCount = Integer.parseInt(row[3].toString());
			int maxPetitionPerday = 0;
			if(slot.getNoOfWorkday() <= lowWorkDayThreshold) {
				maxPetitionPerday = maxPetitionPerdayLow;
			} else {
				maxPetitionPerday = maxPetitionPerdayHigh;
			}
			if(numCount < maxPetitionPerday) {
				//slot.setAvailability(maxPetitionPerday - numCount);
				slot.setAvailability(1);
			} else {
//				slot.setAvailability(0);
				continue;
			}
			slotList.add(slot);
		}
		return slotList;
	}

}
