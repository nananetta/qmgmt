package com.konkow.framework.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.konkow.framework.domain.master.Slot;
import com.konkow.framework.repository.ISlotRepository;

@Component
public class SlotRepository implements ISlotRepository {

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }
	
	public List<Slot> findAvailableWeekByBranchId(Integer branchId, Integer page, Integer pageSize, Integer maxPetitionPerdayLow, Integer maxPetitionPerdayHigh, Integer lowWorkDayThreshold) {
		
		if(page==null || page < 0) {
			page = 0;
		}
		
		Query query = getSession().createSQLQuery("SELECT w.ID, w.WEEK_TEXT, w.NO_OF_WORKDAY, CASE WHEN p.NUM_COUNT IS NOT NULL THEN p.NUM_COUNT ELSE 0 END AS NUM_COUNT "
				+ " FROM MWA_M_WEEK AS w "
				+ " LEFT OUTER JOIN ( SELECT count(pe.ID) AS NUM_COUNT, pe.WEEK_ID FROM MWA_M_PETITION AS pe WHERE pe.BRANCH_ID = ? GROUP BY pe.WEEK_ID) AS p ON w.ID = p.WEEK_ID")
				.addScalar("ID", IntegerType.INSTANCE)
				.addScalar("WEEK_TEXT", StringType.INSTANCE)
				.addScalar("NO_OF_WORKDAY", IntegerType.INSTANCE)
				.addScalar("NUM_COUNT", IntegerType.INSTANCE);
		
		List<Slot> slotList = new ArrayList<Slot>();
		List<Object[]> rows = query.setParameter(0, branchId).list();
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
