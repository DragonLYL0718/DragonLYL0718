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

## Stm32Cubemx Setup

### Start a New Project

- Open STM32CubeMX.
- Select “New Project”.

<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/New%20Project.webp" data-lightbox="roadtrip">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/New%20Project.webp" alt="New Project" style="width:100%;max-width:1000px" loading="lazy">
</a>

- Choose the STM32WLE5CCU6 microcontroller from the MCU list.

<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Choose%20MCU.webp" data-lightbox="roadtrip">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Choose%20MCU.webp" alt="Choose MCU" style="width:100%;max-width:1000px" loading="lazy">
</a>

### Configure Clock Settings

- For low power consumption, optimize the clock settings.
- Go to the “Clock Configuration” tab.
- Set the clock speeds to the minimum required for your application to reduce power consumption.
<a href="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Clock%20Configuration.webp" data-lightbox="roadtrip">
    <img src="https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/cubemx/Clock%20Configuration.webp" alt="Choose MCU" style="width:100%;max-width:1000px" loading="lazy">
</a>
[More details](/projects/epaper/clock)

### Coming Soon

## PCB Design
[stm32wle5c8.pdf](https://pageasset.oss-cn-hongkong.aliyuncs.com/project/epaper/pcb/stm32wle5c8.pdf)

[More Information for Minimum Board](/projects/epaper/minimumboard)