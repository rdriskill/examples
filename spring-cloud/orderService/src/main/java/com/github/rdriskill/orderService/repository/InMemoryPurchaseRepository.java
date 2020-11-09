package com.github.rdriskill.orderService.repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.github.rdriskill.orderService.model.Purchase;

/**
 * Basic in memory storage implementation for Order persistence. Should only be
 * used in testing.
 * 
 * @author adriskil
 */

/*
 *  Since this is an in memory data source, Hystrix usage is not required here. If implementations
 *  of PurchaseRepository call external resources, Hystrix should be used.
 */
@Repository
public class InMemoryPurchaseRepository implements PurchaseRepository {
	
	private Map<String, Purchase> map = new HashMap<String, Purchase>();

	@Override
	public Purchase getById(String id) {
		return map.get(id);
	}

	@Override
	public Collection<Purchase> list() {
		return map.values();
	}

	@Override
	public Purchase save(Purchase purchase) {
		return map.put(purchase.getId(), purchase);
	}

	@Override
	public Purchase update(Purchase purchase) {
		return map.put(purchase.getId(), purchase);
	}

	@Override
	public void delete(String id) {
		map.remove(id);
	}
}
