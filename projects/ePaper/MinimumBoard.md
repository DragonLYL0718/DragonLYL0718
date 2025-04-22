---
layout: page
title: Minimum Board
permalink: /projects/epaper/minimumboard
---

1. this list will be replaced by the toc
{:toc .large-only}

## **Power Connection:**

- VDD pins: connect all VDD pins to a stabilized 3.3V supply.
VSS or GND pin: Connect all ground pins to a common ground.

## **Clock Source:**

- If your application requires an accurate clock, you can connect an external crystal to the OSC_IN and OSC_OUT pins. Otherwise, an internal clock source (such as HSI or MSI) can be used.
    [More Detail](/projects/epaper/minimumboard/clocksource)
    

## **Reset Circuit:**

- Connect a pull-up resistor to the NRST pin and add a reset button optionally.

## **Programming and debugging interface:**

- Reserve the SWD interface, including the SWDIO, SWCLK pins, and a GND and VDD supply pin, for easy connection to ST-Link or other debuggers.

## **Boot Mode:**

- The BOOT0 pin typically requires a pull-up or pull-down resistor to select the boot mode (boot from system memory or main flash).

## **I/O pins:**

- I/O pins that need to be used can be pinned out to connectors or pads for external connections.

## **Decoupling Capacitors:**

- Decoupling capacitors (typically 0.1μF to 10μF) are placed near VDD to stabilize the power supply and reduce noise.

## **Optional Peripherals:**

- If communication functions such as USART, SPI, or I2C need to be used, the corresponding pins should also be pinned out and properly configured.

## **Power Indication:**

- An LED power indicator and current limiting resistor can be added to indicate power status.

## **Power Management:**

- If SMPS is not used, the pins associated with SMPS are ignored. If SMPS is used, it needs to be properly configured according to the datasheet.