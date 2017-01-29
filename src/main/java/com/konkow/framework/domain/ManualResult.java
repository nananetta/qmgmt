package com.konkow.framework.domain;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.konkow.framework.FrameworkProperties;

public class ManualResult<E> implements Result<E> {

    private long total;

    private List<E> list;

    private int pageSize = Integer.parseInt(FrameworkProperties.getDefaultPageSize());

    public ManualResult(List<E> list) {
    	this.list = list;
    	this.total = list.size();
    }

    @JsonIgnore
    public ManualResult<E> buildResult() {
        return this;
    }

    public List<E> getList() {
        return list;
    }

    public long getTotal() {
        return total;
    }

    public Page<E> getPage(Integer page, Integer pageSize) {
        page = page < 1 ? 1 : page;
        int startIndex = (page - 1) * pageSize; // Start from 0
        int noOfPage = (int) Math.ceil((double) (total) / pageSize);

        Page<E> resultPage = new Page<E>(list);
        resultPage.setStartIndex(startIndex);
        resultPage.setPage(page);
        resultPage.setTotal(total);
        resultPage.setTotalPage(noOfPage);
        return resultPage;
    }
    
    public Page<E> getPage(int page) {
        return getPage(page, pageSize);
    }

}
