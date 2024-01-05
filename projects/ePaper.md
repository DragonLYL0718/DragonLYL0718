---
layout: page
title: ePaper Display
permalink: /projects/epaper/
---

1. this list will be replaced by the toc
{:toc .large-only}

## Description
This ongoing project started on 23/Nov 12 using the STM32WLE5CCU6 to control the ink screen. I'm currently trying to learn how to use Stm32 using ChatGPT (I've had experience using it before, but it's been a long time), and I'm hoping to learn the following skills with ChatGPT:

- Configuring Stm32Cubemx
- Simple interaction with ePaper Display using Keil
- Designing a Stm32 PCB

The guidelines mentioned below were initially created by ChatGPT 4 and have been modified since then.

## Stm32Cubemx Setup

### **Start a New Project**

- Open STM32CubeMX.
- Select “New Project”.
- Choose the STM32WLE5CCU6 microcontroller from the MCU list.

### **Configure Clock Settings**

- For low power consumption, optimize the clock settings.
- Go to the “Clock Configuration” tab.
- Set the clock speeds to the minimum required for your application to reduce power consumption.

[More details](/projects/epaper/clock)