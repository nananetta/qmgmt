package com.konkow.framework.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.konkow.framework.domain.ume.Role;
import com.konkow.framework.domain.ume.User;
import com.konkow.framework.repository.IUserRepository;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    @Qualifier("userRepository")
    private IUserRepository userRepository;

    /**
     * Retrieves a user record containing the user's credentials and access.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
        final String userIdentifier = username.split("=")[1];
        try {
            System.out.println("userIdentifier: " + userIdentifier);
            System.out.println("username: " + username);

            // provide implementation to search user with username in database and
            // return a user of type UserDetails
            // find user in the system
            User user = findUser(username);
            //
            // create Spring UserDetails object
            return createUserDetails(user);
        } catch (Exception e) {
            // if user not found in database throw exception
            throw new UsernameNotFoundException("Error in retrieving user");
        }
    }

    public User findUser(String key) {
        try {
            return userRepository.findByUserCode(key);
        } catch (EntityNotFoundException e) {
            throw new UsernameNotFoundException(key);
        }
    }

    public UserDetails createUserDetails(User user) {
        // return new org.springframework.security.core.userdetails.User(user.getId().toString(), user.getPassword(),
        // true, true, true, true, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        return new org.springframework.security.core.userdetails.User(user.getId().toString(), user.getPassword(),
                true, true, true, true, getAuthorities(user.getRoles()));
    }

    public List<String> getRolesAsList(Set<Role> roles) {
        List<String> rolesAsList = new ArrayList<String>();
        for (Role role : roles) {
            rolesAsList.add(role.getRoleName());
        }
        return rolesAsList;
    }

    public static List<GrantedAuthority> getGrantedAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        return authorities;
    }

    public Collection<? extends GrantedAuthority> getAuthorities(Set<Role> roles) {
        List<GrantedAuthority> authList = getGrantedAuthorities(getRolesAsList(roles));
        return authList;
    }
}