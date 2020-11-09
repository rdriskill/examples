package com.github.rdriskill.inventoryService.env;

/**
 * Used to enumerate application level properties.
 * @author adriskil
 */
public enum Properties {
	
	// Location in classpath for ItemStock JSON file.
	APP_JSON_ITEM_STOCKS("app.json.itemStocks");
	
	private String value;
	
	Properties(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
