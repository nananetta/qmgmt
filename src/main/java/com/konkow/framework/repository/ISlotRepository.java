package com.konkow.framework.repository;

import java.util.List;

import com.konkow.framework.domain.master.Slot;

public interface ISlotRepository {

	public List<Slot> findAvailableWeekByBranchId(Integer branchId, Integer page, Integer pageSize, Integer maxPetitionPerday);

}
