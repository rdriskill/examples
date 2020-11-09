package com.github.rdriskill.orderService.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.rdriskill.orderService.model.Purchase;
import com.github.rdriskill.orderService.service.PurchaseService;

/**
 * @author adriskil
 */

@RestController
@RequestMapping("/purchases")
public class PurchaseController {
	
	@Autowired
	private PurchaseService purchaseService;
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public Purchase getById(@PathVariable String id) {
		return purchaseService.getById(id);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public Collection<Purchase> list() {
		return purchaseService.list();
	}
	
    @RequestMapping(method = RequestMethod.POST)
    public Purchase save(@RequestBody Purchase purchase) {
    	return purchaseService.save(purchase);
    }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public Purchase update(@PathVariable String id, @RequestBody Purchase purchase) {
    	return purchaseService.update(id, purchase);
    }
}