package com.github.rdriskill.inventoryService.repository;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.rdriskill.inventoryService.env.Properties;
import com.github.rdriskill.inventoryService.model.ItemStock;

/**
 * Basic in memory storage implementation for ItemStock persistence. Should only be
 * used in testing.
 * 
 * @author adriskil
 */

/*
 *  Since this is an in memory data source, Hystrix usage is not required here. If implementations
 *  of ItemStockRepository call external resources, Hystrix should be used.
 */
@Repository
public class InMemoryItemStockRepository implements ItemStockRepository {
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private Environment env;
	
	private Map<String, ItemStock> map = new HashMap<String, ItemStock>();
	
	/**
	 * Loads initial data from JSON file.
	 * @throws IOException
	 */
	@PostConstruct
	public void init() {
		String itemStocksPath = env.getRequiredProperty(Properties.APP_JSON_ITEM_STOCKS.getValue());
		ClassPathResource resource = new ClassPathResource(itemStocksPath);
		
		try (InputStream input = resource.getInputStream()) {
			List<ItemStock> list = objectMapper.readValue(StreamUtils.copyToString(input, StandardCharsets.UTF_8), new TypeReference<List<ItemStock>>(){});
			map = list.stream().collect(Collectors.toMap(ItemStock::getId, Function.identity()));
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}

	@Override
	public ItemStock getById(String id) {
		return map.get(id);
	}
	
	@Override
	public ItemStock getByItemId(String itemId) {
		ItemStock result = null;
		
		Optional<ItemStock> optional = this.map.values().stream()
				.filter(itemStock -> itemStock.getItem() != null && itemStock.getItem().getId().equals(itemId))
				.findFirst();
		
		if(optional.isPresent()) {
			result = optional.get();
		}
		
		return result;
	}

	@Override
	public Collection<ItemStock> list() {
		return map.values();
	}

	@Override
	public ItemStock save(ItemStock itemStock) {
		return map.put(itemStock.getId(), itemStock);
	}

	@Override
	public ItemStock update(ItemStock itemStock) {
		return map.put(itemStock.getId(), itemStock);
	}

	@Override
	public void delete(String id) {
		map.remove(id);
	}
}