package com.nananetta.framework.domain;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nananetta.framework.FrameworkProperties;

public class ManualResult<E> implements Result<E> {

    private long total;

    private List<E> list;

    private int pageSize;

    public ManualResult(List<E> list, int pageSize) {
    	this.list = list;
    	this.total = list.size();
    	this.pageSize = pageSize;
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
        return null;
    }
    
    public Page<E> getPage(int page) {
        return getPage(page, pageSize);
    }

}
