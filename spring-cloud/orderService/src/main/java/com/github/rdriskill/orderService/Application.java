package com.github.rdriskill.orderService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Bean;

import com.github.rdriskill.orderService.message.MessageChannels;
import com.netflix.hystrix.contrib.javanica.aop.aspectj.HystrixCommandAspect;

@SpringBootApplication
@EnableDiscoveryClient
@EnableCircuitBreaker
@EnableBinding(MessageChannels.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public HystrixCommandAspect hystrixAspect() {
		return new HystrixCommandAspect();
	}
}
