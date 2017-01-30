package com.nananetta.framework.repository;

import com.nananetta.framework.domain.Result;
import com.nananetta.framework.domain.ume.Role;
import com.nananetta.framework.domain.ume.RoleQuery;
import com.nananetta.framework.domain.ume.User;
import com.nananetta.framework.domain.ume.UserQuery;

public interface IUserRepository extends Repository<User, Long> {

    User findByUserCode(String key);

    Result<Role> findByRoleQuery(RoleQuery query);

    Result<User> findByQuery(UserQuery query);

}
