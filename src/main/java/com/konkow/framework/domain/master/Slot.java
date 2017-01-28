package com.konkow.framework.domain.master;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Slot {

	private Integer weekId;
	private String weekText;
	private Integer noOfWorkday;
	private Integer availability;
	
	public Integer getWeekId() {
		return weekId;
	}

	public void setWeekId(Integer weekId) {
		this.weekId = weekId;
	}

	public String getWeekText() {
		return weekText;
	}

	public void setWeekText(String weekText) {
		this.weekText = weekText;
	}

	public Integer getNoOfWorkday() {
		return noOfWorkday;
	}

	public void setNoOfWorkday(Integer noOfWorkday) {
		this.noOfWorkday = noOfWorkday;
	}

	public Integer getAvailability() {
		return availability;
	}

	public void setAvailability(Integer availability) {
		this.availability = availability;
	}

}