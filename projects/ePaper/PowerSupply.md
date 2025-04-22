---
layout: page
title: Power Supply
permalink: /projects/epaper/powersupply
---

1. this list will be replaced by the toc
{:toc .large-only}

## SMPS

- **VSS_SMPS:** This is the ground (Ground) pin for the switched mode power supply (SMPS). It is used to connect the negative end of the SMPS to the system ground.
- **VLX_SMPS:** This pin is the inductive connection point of the SMPS and is usually connected to an inductor. The inductor stores and releases energy between this pin and the ground while the SMPS operates.

- **VDD_SMPS:** This is the input voltage pin for the SMPS. It provides power to the internal switch-mode power supply to enable it to generate the required internal voltage.
- **VFB_SMPS:** This is the feedback voltage pin for the SMPS, which is typically connected to a voltage divider that is used to provide a feedback signal to the SMPS control loop to stabilize the output voltage.

Specifically, these pins enable the STM32 microcontroller to selectively use the internal switch-mode power supply to provide more efficient power conversion, thereby reducing overall power consumption. For example, if your application requires lower power consumption, you can design the circuit to use the built-in SMPS instead of a linear regulator.

### The difference between with and without SMPS

The STM32WLE5CCU6 microcontroller will not be able to utilize its built-in switched-mode power supply (SMPS) if you supply power only to VDD and not to VDD_SMPS. In this case, the microcontroller will be directly powered by the power received through the VDD pin, and all core logic and I/O ports will be powered by this supply.

Without the SMPS, the microcontroller's power configuration will be similar to the traditional single-power input approach. The simplicity of doing this is one of its advantages, especially in terms of power supply circuit design and the number of components (Bill of Materials, BOM) that can be simpler and less costly. In addition, if your application does not require extreme power efficiency or the microcontroller does not run in high-power mode for long periods of time, then you may not need SMPS.

In contrast, the advantages of enabling and using SMPS include:

- **Higher power efficiency:** SMPSs typically provide higher energy conversion efficiencies, especially when the load is highly variable.
- **Reduced heat generation:** SMPSs generate less heat during operation due to higher conversion efficiencies.
- **Extended Battery Life:** If the application is battery-powered, using an SMPS can reduce battery consumption and extend battery life.
- **Supports Wide Voltage Input Range:** SMPS can accept a wider voltage input range and still provide a stable output.
- **Dynamic Power Management:** SMPS allows for more flexible power management, for example, adjusting the supply voltage based on current performance demands.

## VBAT

The VBAT is dedicated to supplying power to the real-time clock (RTC) and the backup registers, keeping these functions running when VDD power is unavailable.
Suppose your circuit design requires that VDD and VBAT be powered via the battery. In that case, you should use a diode or other isolation component to prevent the current from the VBAT supply from flowing into the main power line when the main power supply is disconnected. For example, you could include a Schottky diode between VDD and VBAT, which would ensure that the VBAT could power the real-time clock or backup area even if the mains VDD is not powered.