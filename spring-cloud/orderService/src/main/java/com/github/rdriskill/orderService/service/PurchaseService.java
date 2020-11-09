package com.github.rdriskill.orderService.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.github.rdriskill.orderService.model.Purchase;
import com.github.rdriskill.orderService.repository.PurchaseRepository;

/**
 * Domain service that encapsulates business logic for purchases.
 * 
 * @author adriskil
 */

@Service
public class PurchaseService {
	
	@Autowired
	private PurchaseRepository purchaseRepository;
	
	@Autowired
	private InventoryService inventoryService;

	public Purchase getById(String id) {
		return purchaseRepository.getById(id);
	}
	
	public Collection<Purchase> list() {
		return purchaseRepository.list();
	}
	
	public Purchase save(@RequestBody Purchase purchase) {
    	Integer itemInventoryQuantity = inventoryService.getItemInventoryQuantity(purchase.getItemId());
    	
    	if(itemInventoryQuantity > purchase.getQuantity()) {
        	inventoryService.updateInventory(purchase);
        	return purchaseRepository.save(purchase);
    	} else {
    		throw new RuntimeException("Item purchase quantity is greater than item inventory quantity.");
    	}
	}
	
	public Purchase update(String id, Purchase purchase) {
    	Integer itemInventoryQuantity = inventoryService.getItemInventoryQuantity(purchase.getItemId());
    	
    	if(itemInventoryQuantity > purchase.getQuantity()) {
        	inventoryService.updateInventory(purchase);
        	return purchaseRepository.update(purchase);
    	} else {
    		throw new RuntimeException("Item purchase quantity is greater than item inventory quantity.");
    	}
	}
}
