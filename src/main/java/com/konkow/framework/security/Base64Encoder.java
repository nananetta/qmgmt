package com.metis.dbdwebservice.security;

import javax.xml.bind.DatatypeConverter;

import org.springframework.security.crypto.password.PasswordEncoder;

public class Base64Encoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        String encoded = DatatypeConverter.printBase64Binary(rawPassword.toString().getBytes());
        return encoded;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        byte[] decoded = DatatypeConverter.parseBase64Binary(encodedPassword);
        String decodedString = new String(decoded);
        return (decodedString.equals(rawPassword));
    }

}
