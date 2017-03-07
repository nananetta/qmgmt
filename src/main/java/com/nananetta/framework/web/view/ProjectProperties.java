package com.nananetta.framework.web.view;

import com.nananetta.framework.FrameworkProperties;

public final class ProjectProperties extends FrameworkProperties {

    public static String getDefaultGreeting() {
        return p.getProperty("default.greeting");
    }
    
    public static int getUniquePetitionWeekPeriod() {
        return Integer.parseInt(p.getProperty("uniquePetitionWeekPeriod"));
    }

}
