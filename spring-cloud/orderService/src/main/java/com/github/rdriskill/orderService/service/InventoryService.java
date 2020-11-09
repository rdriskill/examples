package com.github.rdriskill.orderService.service;

import java.util.List;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.rdriskill.orderService.model.Purchase;
import com.github.rdriskill.orderService.model.PurchaseStatus;
import com.github.rdriskill.orderService.repository.PurchaseRepository;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

/**
 * Infrastructure service that communicates to external services for inventory information.
 * @author adriskil
 */
@Service
public class InventoryService {
	
	private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);
	
	@Autowired
	private PurchaseRepository purchaseRepository;
	
	@Autowired @Qualifier("purchases")
	private MessageChannel purchasesOutputChannel;
	
	@Autowired
	private DiscoveryClient discoveryClient;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	/**
	 * Retrieves the current inventory quantity associated with the specified item identifier.
	 * @param itemId
	 * @return item inventory quantity
	 */
	@HystrixCommand
	public Integer getItemInventoryQuantity(String itemId) {
		List<ServiceInstance> instances = discoveryClient.getInstances("inventoryService");
		
		if(instances != null && !instances.isEmpty()) {
			String url = new StringBuffer()
					.append(instances.get(0).getUri())
					.append("/itemStocks/item/")
					.append(itemId)
					.toString();
			
			RestTemplate restTemplate = new RestTemplate();
			
			try {
				JSONObject itemStockJson = new JSONObject(restTemplate.getForObject(url, String.class));
				return itemStockJson.getInt("quantity");
			} catch(JSONException jsonException) {
				throw new RuntimeException("Error in JSON returned when attempting to get item inventory quantity.", jsonException);
			}

		} else {
			throw new RuntimeException("Did not locate inventoryService to get item inventory quantity.");
		}
	}
	
	@HystrixCommand
	public Boolean updateInventory(Purchase purchase) {
    	try {
	    	Purchase previousPurchase = purchaseRepository.getById(purchase.getId());
	    	
	    	if((previousPurchase == null || !previousPurchase.getStatus().equals(purchase.getStatus())) 
	    			&& purchase.getStatus().equals(PurchaseStatus.COMPLETED)) {

	    		JSONObject purchaseJson = new JSONObject(objectMapper.writeValueAsString(purchase));
	    		Boolean isMsgSent = purchasesOutputChannel.send(MessageBuilder.withPayload(purchaseJson.toString()).build());
	    		logger.info("A purchases msg attempt was made and returned a success flag of " + isMsgSent);
	    		return isMsgSent;
	    	} else {
	    		return Boolean.FALSE;
	    	}
    	} catch(Exception ex) {
    		throw new RuntimeException("Error attemping to update inventory with purchase", ex);
    	}
	}
}
