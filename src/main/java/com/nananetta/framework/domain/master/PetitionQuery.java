package com.nananetta.framework.domain.master;

import com.nananetta.framework.domain.AbstractQuery;

public class PetitionQuery extends AbstractQuery {

    private Integer weekId;
    private Integer weekStart;
    private Integer weekEnd;
    private Integer branchId;
    private String accountNo;
    
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
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public Integer getWeekStart() {
		return weekStart;
	}
	public void setWeekStart(Integer weekStart) {
		this.weekStart = weekStart;
	}
	public Integer getWeekEnd() {
		return weekEnd;
	}
	public void setWeekEnd(Integer weekEnd) {
		this.weekEnd = weekEnd;
	}
	
	

}
