package com.github.rdriskill.orderService.message;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

/**
 * @author adriskil
 */
public interface MessageChannels {

	@Output
    MessageChannel purchases();
}
