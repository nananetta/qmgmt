package com.nananetta.framework.repository;

import java.util.List;

import com.nananetta.framework.domain.master.Slot;

public interface ISlotRepository {

	public List<Slot> findAvailableWeekByBranchId(Integer branchId, Integer page, Integer pageSize, Integer maxPetitionPerdayLow, Integer maxPetitionPerdayHigh, Integer lowWorkDayThreshold);

}
