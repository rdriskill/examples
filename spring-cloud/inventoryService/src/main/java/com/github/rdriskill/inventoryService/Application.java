package com.github.rdriskill.inventoryService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;

import com.github.rdriskill.inventoryService.message.MessageChannels;

@SpringBootApplication
@EnableDiscoveryClient
@EnableBinding(MessageChannels.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}