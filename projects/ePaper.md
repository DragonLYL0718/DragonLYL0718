---
layout: pageproject
title: Learning Project.
permalink: /projects/epaper/
---

1. this list will be replaced by the toc
{:toc .large-only}

## Description
This ongoing project started on 23/Nov 12 using the STM32WLE5CCU6 to control the ink screen. I'm currently trying to learn how to use Stm32 using ChatGPT (I've had experience using it before, but it's been a long time), and I'm hoping to learn the following skills with ChatGPT:

- Configuring Stm32Cubemx
- Simple interaction with ePaper Display using Keil
- Designing a Stm32 PCB
- If you have any suggestions for interactions or other technical issues, please feel free to share them!

The guidelines mentioned below were initially created by ChatGPT 4 and have been modified since then.

<details>
    <summary><strong>Catalog</strong></summary>
    <ul>
        <li><a href="#stm32cubemx-setup">Stm32Cubemx Setup</a></li>
        <li><a href="#pcb-design">PCB Design</a></li>
    </ul>
</details>

## Stm32Cubemx Setup

### Start a New Project

- Open STM32CubeMX.
- Select “New Project”.

<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/New%20Project.webp" data-lightbox="roadtrip" class="image-link">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/New%20Project.webp" alt="New Project" style="width:100%;max-width:1000px" loading="lazy">
</a>

- Choose the STM32WLE5CCU6 microcontroller from the MCU list.

<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Choose%20MCU.webp" data-lightbox="roadtrip" class="image-link">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Choose%20MCU.webp" alt="Choose MCU" style="width:100%;max-width:1000px" loading="lazy">
</a>

### Configure Clock Settings

- Optimize the clock settings for low power consumption.
- Go to the “Clock Configuration” tab.
- Set the clock speeds to the minimum required for your application to reduce power consumption.
<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Clock%20Configuration.webp" data-lightbox="roadtrip" class="image-link">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Clock%20Configuration.webp" alt="Choose MCU" style="width:100%;max-width:1000px" loading="lazy">
</a>
[More details](/projects/epaper/clock)

### Coming Soon!

## PCB Design
For this project, I used EasyEDA. <br/>
[stm32wle5c8.pdf](https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/pcb/stm32wle5c8.pdf)<br/>
[More Information for Minimum Board](/projects/epaper/minimumboard)
### Block Diagram

- **STM32WLE5/E4xx block diagram** on page 14 provides an overview of the microcontroller's architecture, including the core, memory, and peripherals.

### Power Supply:

- The power supply scheme on page 64 gives information on connecting power to the MCU and the necessary components like capacitors. [More Information](/projects/epaper/powersupply)

### Clock Configuration:

The clock tree on page 38 details the internal and external clock sources, which is crucial for configuring the microcontroller's clock system to drive the e-ink display.

### Pinout Information:

- **UFQFPN48 pinout** on page 51 and **UFBGA73 pinout** on page 52 provide the pin configurations for different packages of STM32WLE5CCU6. This is necessary to connect the correct MCU pins to the corresponding pins of the e-ink display. In our case, we are using the UFQFPN48 package.