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

<a href="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/New%20Project.webp" data-lightbox="roadtrip" class="image-link">
    <img src="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/New%20Project.webp" alt="New Project" style="max-width:100%" loading="lazy">
</a>

- Choose the STM32WLE5CCU6 microcontroller from the MCU list.

<a href="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/Choose%20MCU.webp" data-lightbox="roadtrip" class="image-link">
    <img src="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/Choose%20MCU.webp" alt="Choose MCU" style="max-width:100%" loading="lazy">
</a>

### Configure Clock Settings

- Optimize the clock settings for low power consumption.
- Go to the “Clock Configuration” tab.
- Set the clock speeds to the minimum required for your application to reduce power consumption.
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/Clock%20Configuration.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/cubemx/Clock%20Configuration.webp" alt="Choose MCU" style="max-width:100%" loading="lazy">
  </a>
  [More details](/projects/epaper/clock)

### Coming Soon!

## PCB Design

For this project, I used EasyEDA. <br/>
[stm32wle5c8.pdf](https://pageasset.rayleigh-lin.top/project/epaper/pcb/stm32wle5c8.pdf)<br/>
[More Information for Minimum Board](/projects/epaper/minimumboard)
<font color="#dd0000">The external crystal is not working correctly.</font>

### Block Diagram

- **STM32WLE5/E4xx block diagram** on page 14 provides an overview of the microcontroller's architecture, including the core, memory, and peripherals.

### Power Supply

- The power supply scheme on page 64 gives information on connecting power to the MCU and the necessary components like capacitors. [More Information](/projects/epaper/powersupply)

- I connect VDD directly to VBAT due to the absence of a battery backup, which aligns with minimizing the design's complexity.
- Decoupling capacitors are essential for stabilizing the power supply voltage and filtering out high-frequency noise. The STM32WLE5CCU6 datasheet specifies these capacitors' recommended values and placements for optimal performance. Close attention to the datasheet recommendations will ensure that the MCU operates reliably under varying conditions and minimizes potential interference to sensitive analog circuits.<br/>
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/pcb/PowerDecoupling.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/pcb/PowerDecoupling.webp" alt="Decoupling" style="max-width:100%" loading="lazy">
  </a>
- I chose to use two LDOs (Low Dropout Linear Regulators) to power the VDD (digital power supply) and VDDA (analog power supply) separately to maintain analog power supply stability and reduce power supply noise interference. This is especially important when designing circuits that involve precision analog signal processing, such as ADCs (analog to digital converters), DACs (digital to analog converters), or other analog interfaces. The following explains in detail why this is done:
- **Isolation from Digital Noise**: Digital circuits operate with high power supply noise, mainly caused by the large number of fast switching actions in digital circuits. If transmitted to the analog power supply, this noise may seriously affect the quality of the analog signal. Using a separate LDO to supply power to the analog circuits, the noise caused by the digital circuits can be effectively isolated, thus protecting the analog circuit portion from being affected.
- **Improving power quality**: Analog circuits usually require a higher purity from the power supply than digital circuits. Using a separate LDO to power the analog circuits ensures that they receive a more stable and cleaner power supply, improving the overall circuit performance.
- **Optimized power management**: In some application scenarios, the operating states of the analog and digital parts may differ. For example, only the analog circuits may be required to operate in low-power mode. In this case, the power supply of the digital part can be turned off separately while keeping the power supply of the analog part unchanged to optimize power consumption.
- **Improved Design Flexibility**: Designing power supplies for analog and digital circuits separately provides greater design flexibility, allowing for optimization of power supply voltage selection, filtering design, etc., based on the specific needs of the analog and digital circuits.<br/>
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/pcb/LDO.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/pcb/LDO.webp" alt="LDO" style="max-width:100%" loading="lazy">
  </a>

### USART & Power Supply

- The USB Type-C interface has double-sided pluggability and high-speed data transfer capability. It simplifies connectivity and provides enhanced power supply capabilities. Integrating UART communication usually requires a USB-to-serial converter, and the CH340 is a popular choice. This chip converts USB signals to UART signals, allowing the microcontroller to communicate with the computer via the Type-C interface.
- The type-C's VBUS and GND pins serve as the power supply, while the CC1 and CC2 pins are responsible for cable orientation detection, following standard USB functionality configurations. The CH340 chip, with its VCC, GND, TXD, and RXD pins, is the key to enabling data transfer. These pins are connected to the power supply, ground, and the microcontroller's UART receive and transmit pins, respectively, facilitating the smooth flow of data.
- The TPD4E1U06DCKR is an ESD protection device commonly used to protect the USB data lines D+ and D- from damage caused by electrostatic discharge.
- Ensuring that the power supply is stable is critical in PCB design. It is standard practice to utilize capacitors for decoupling and filtering, which helps stabilize the power supply and reduce high-frequency noise. In your design, C14 is a decoupling capacitor connected in parallel with the VBUS line to provide stability. In addition, resistors R5 and R6 provide overcurrent protection to ensure the safety of the Type-C interface.
- When designing the layout, keeping the traces short and length-matched for USB data lines D+ and D-is critical. This helps ensure signal integrity and reduces transmission delays. To further ensure the reliability of the design, place the decoupling capacitor as close as possible to the power pin of the CH340.
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/pcb/UART.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/pcb/UART.webp" alt="UART" style="max-width:100%" loading="lazy">
  </a>

### Clock Configuration

The clock tree on page 38 details the internal and external clock sources, which are crucial for configuring the microcontroller's clock system to drive the e-ink display.

- In our PCB design, we use a 16MHz external crystal oscillator.<br/>
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/pcb/ClockConfiguration.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/pcb/ClockConfiguration.webp" alt="LDO" style="max-width:100%" loading="lazy">
  </a>

### Stlink:

- STLink is a debugger and programmer from STMicroelectronics that allows developers to program and debug firmware for STM32 microcontrollers and STM8 microcontrollers. It typically connects to the developer's PC via a USB interface and connects to the target microcontroller via a JTAG or SWD interface. In this project, I used SWD to connect to the target controller.<br/>
  <a href="https://pageasset.rayleigh-lin.top/project/epaper/pcb/Stlink.webp" data-lightbox="roadtrip" class="image-link">
  <img src="https://pageasset.rayleigh-lin.top/project/epaper/pcb/Stlink.webp" alt="Stlink" style="max-width:100%" loading="lazy">
  </a>

### Pinout Information:

- **UFQFPN48 pinout** on page 51 and **UFBGA73 pinout** on page 52 provide the pin configurations for different packages of STM32WLE5CCU6. This is necessary to connect the correct MCU pins to the corresponding pins of the e-ink display. In our case, we are using the UFQFPN48 package.

---

<strong><font color="#dd0000">After completing the above, you can create a minimum system board. You can find the schematic and PCB layout design here: <a href="https://github.com/DragonLYL0718/InkScreenDisplay/tree/master/PCB/MiniBoard">https://github.com/DragonLYL0718/InkScreenDisplay/tree/master/PCB/MiniBoard</a><br/>This is also my first design, so there are some areas that are not well standardized</font></strong>

---

### ePaper Driver

The design of our driver boards references the schematic design from [Waveshare](https://www.waveshare.net/w/upload/8/85/2.9inch_e-Paper_Schematic.pdf).

You can also find our schematic and PCB layout design here: [Link](https://github.com/DragonLYL0718/InkScreenDisplay/tree/master/PCB/DriverBoard).
