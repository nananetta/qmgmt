package com.konkow.framework.domain.master;

import com.konkow.framework.domain.AbstractQuery;

public class PetitionQuery extends AbstractQuery {

    private Integer weekId;
    private Integer branchId;
    
	public Integer getWeekId() {
		return weekId;
	}
	public void setWeekId(Integer weekId) {
		this.weekId = weekId;
	}
	public Integer getBranchId() {
		return branchId;
	}
	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

}
