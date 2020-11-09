package com.github.rdriskill.orderService.repository;

import java.util.Collection;

import com.github.rdriskill.orderService.model.Purchase;

/**
 * @author adriskil
 */
public interface PurchaseRepository {
	
	Purchase getById(String id);
	
	Collection<Purchase> list();
	
	Purchase save(Purchase purchase);
	
	Purchase update(Purchase purchase);
	
	void delete(String id);
}
