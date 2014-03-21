package com.morisenmen.test;

import org.springframework.transaction.PlatformTransactionManager;

import javax.annotation.Resource;

public class TransactionRunner {

//    <bean id="txManager"
//    class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
//    <property name="dataSource" ref="dataSource"/>
//    </bean>
    @Resource
    private PlatformTransactionManager txManager;

    public void run() {
        try (TransactionWrapper transactional = new TransactionWrapper(txManager)) {
            // do something
            transactional.done();
        } catch (Exception e) {
            //To change body of catch statement use File | Settings | File Templates.
            e.printStackTrace();
        }
    }
}
