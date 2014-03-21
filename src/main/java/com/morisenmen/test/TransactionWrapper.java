package com.morisenmen.test;

import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class TransactionWrapper implements AutoCloseable{

    private PlatformTransactionManager txManager;

    private static DefaultTransactionDefinition def = new DefaultTransactionDefinition();

    private TransactionStatus status;

    private boolean succeed = false;

    public TransactionWrapper(PlatformTransactionManager txManager) {
        this.txManager = txManager;
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        status = txManager.getTransaction(def);
    }

    public void done() {
        succeed = true;
    }

    @Override
    public void close() throws Exception {
        if (succeed) {
            txManager.commit(status);
        } else {
            txManager.rollback(status);
        }
    }
}
