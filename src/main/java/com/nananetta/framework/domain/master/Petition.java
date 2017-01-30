package com.nananetta.framework.domain.master;

import java.util.Date;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.nananetta.framework.domain.AbstractDomain;

@Entity
@JsonInclude(Include.NON_NULL)
public class Petition extends AbstractDomain<Long> {

	private String accountNo;
	private String petitionNo;
	private Date petitionDate;
	private Branch branch;
	private Week week;
	
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getPetitionNo() {
		return petitionNo;
	}
	public void setPetitionNo(String petitionNo) {
		this.petitionNo = petitionNo;
	}
	public Date getPetitionDate() {
		return petitionDate;
	}
	public void setPetitionDate(Date petitionDate) {
		this.petitionDate = petitionDate;
	}
	public Branch getBranch() {
		return branch;
	}
	public void setBranch(Branch branch) {
		this.branch = branch;
	}
	public Week getWeek() {
		return week;
	}
	public void setWeek(Week week) {
		this.week = week;
	}

	
}