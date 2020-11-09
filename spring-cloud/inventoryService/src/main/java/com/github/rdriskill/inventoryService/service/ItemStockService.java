package com.github.rdriskill.inventoryService.service;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Service;

import com.github.rdriskill.inventoryService.model.ItemStock;
import com.github.rdriskill.inventoryService.repository.ItemStockRepository;

/**
 * Infrastructure service that communicates to external services for item stock information.
 * @author adriskil
 */

@Service
public class ItemStockService {
	
	private static final Logger logger = LoggerFactory.getLogger(ItemStockService.class);

	@Autowired
	private ItemStockRepository itemStockRepository;
	/**
	 * Receives messages when a purchase has been made and decrements purchased
	 * item's inventory quantity.
	 * 
	 * @param purchase
	 * @throws JSONException 
	 */
	@StreamListener("purchases")
	private void updateItemStockForPurchase(String purchase) throws JSONException {
		// Liberally accept any JSON structure as long as the required fields are present.
		JSONObject purchaseJson = new JSONObject(purchase);
		logger.info("Received msg from purchases channel: " + purchaseJson.toString(3));
		
		if (purchaseJson.has("itemId") && purchaseJson.has("quantity")) {
			ItemStock itemStock = itemStockRepository.getByItemId(purchaseJson.getString("itemId"));
			itemStock.setQuantity(itemStock.getQuantity() - purchaseJson.getInt("quantity"));
			itemStockRepository.update(itemStock);
		} else {
			throw new RuntimeException("Required values are not present for updating inventory based on purchase.");
		}
	}
}
