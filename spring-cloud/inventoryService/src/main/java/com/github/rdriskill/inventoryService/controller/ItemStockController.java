package com.github.rdriskill.inventoryService.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.rdriskill.inventoryService.model.ItemStock;
import com.github.rdriskill.inventoryService.repository.ItemStockRepository;

/**
 * @author adriskil
 */

@RestController
@RequestMapping("/itemStocks")
public class ItemStockController {
	
	@Autowired
	private ItemStockRepository itemStockRepository;

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ItemStock getById(@PathVariable String id) {
		return itemStockRepository.getById(id);
	}
	
	@RequestMapping(path = "/item/{itemId}", method = RequestMethod.GET)
	public ItemStock getByItemId(@PathVariable String itemId) {
		return itemStockRepository.getByItemId(itemId);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public Collection<ItemStock> list() {
		return itemStockRepository.list();
	}
	
    @RequestMapping(method = RequestMethod.POST)
    public ItemStock save(@RequestBody ItemStock itemStock) {
    	return itemStockRepository.save(itemStock);
    }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public ItemStock update(@PathVariable String id, @RequestBody ItemStock itemStock) {
    	return itemStockRepository.update(itemStock);
    }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable String id) throws Exception {
    	itemStockRepository.delete(id);
    }
}
