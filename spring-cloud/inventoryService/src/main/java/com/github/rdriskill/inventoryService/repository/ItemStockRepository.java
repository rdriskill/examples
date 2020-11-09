package com.github.rdriskill.inventoryService.repository;

import java.util.Collection;

import com.github.rdriskill.inventoryService.model.ItemStock;

/**
 * @author adriskil
 */
public interface ItemStockRepository {

	ItemStock getById(String id);
	
	ItemStock getByItemId(String itemId);
	
	Collection<ItemStock> list();
	
	ItemStock save(ItemStock itemStock);
	
	ItemStock update(ItemStock itemStock);
	
	void delete(String id);
}
