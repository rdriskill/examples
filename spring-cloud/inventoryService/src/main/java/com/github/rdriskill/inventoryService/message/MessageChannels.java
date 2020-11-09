package com.github.rdriskill.inventoryService.message;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

/**
 * @author adriskil
 */
public interface MessageChannels {
	
	@Input
    SubscribableChannel purchases();
}
