package com.nananetta.framework.domain.master;

import java.sql.Date;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.nananetta.framework.domain.AbstractDomain;

@Entity
@JsonInclude(Include.NON_NULL)
public class Week extends AbstractDomain<Integer> {

	private String weekText;
	private Date startDate;
	private Date endDate;
	private Integer noOfWorkday;

	public String getWeekText() {
		return weekText;
	}

	public void setWeekText(String weekText) {
		this.weekText = weekText;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getNoOfWorkday() {
		return noOfWorkday;
	}

	public void setNoOfWorkday(Integer noOfWorkday) {
		this.noOfWorkday = noOfWorkday;
	}

}