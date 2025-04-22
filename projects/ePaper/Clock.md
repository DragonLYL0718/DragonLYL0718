---
layout: newpage
title: Clock Configuration
permalink: /projects/epaper/clock
---

1. this list will be replaced by the toc
{:toc .large-only}

## The following are suggestions for low power consumption

### **High-Speed External (HSE) Oscillator**

- Consider using a lower frequency which can help reduce power consumption.

### **High-Speed Internal (HSI) Oscillator**

- You might want to turn off the HSI if it's not used or reduce the frequency if possible.

### **Phase-Locked Loop (PLL)**

- The PLL multiplies the HSE to get a higher system clock. If you do not need high-speed operation, consider disabling the PLL or using it with a lower multiplication factor.

### **System Clock Mux**

- If your application's speed requirement is not high, this is a good choice as HSI usually consumes less power than HSE or PLL.

### **Clock Prescalers**

- You can increase the APB1 and APB2 prescaler values to reduce the peripheral clock speeds, thereby reducing power consumption.

### **Low-Speed Oscillators**

- LSE (Low-Speed External) and LSI (Low-Speed Internal) are typically used for RTC (Real-Time Clock) and watchdog functions. Ensure you are using the LSE or LSI appropriately, as these are designed for low-power operation.

### **MCO (Microcontroller Clock Output)**

- MCO is set to output a low-speed clock. Ensure this is needed for your application, as driving external components can increase power consumption.

### **Peripheral Clocks**

- Disable any peripheral clocks that are not in use. For example, if you are not using I2C, SPI, USART, RNG, or ADC, ensure their clocks are turned off to save power.

### **Low-Power Modes**

- Beyond the clock configuration, you should also consider using low-power modes provided by the MCU:
    - **Sleep Mode**: Core stopped, peripherals can run.
    - **Stop Mode**: High and low-speed clocks are stopped.
    - **Standby Mode**: Only 1.2 V domain is supplied; the rest are powered off.

### **Miscellaneous**

- Check the voltage scaling settings, which can be adjusted for lower power consumption.
- The "To Power Domain" settings should be carefully managed to ensure only necessary blocks are powered.

## MSI

- using the Multi-Speed Internal (MSI) oscillator at a lower frequency can indeed lead to lower power consumption. The MSI oscillator in STM32 microcontrollers is designed to provide a range of frequency options, and the lower the frequency, the less power the MCU typically consumes.
- **Peripheral Clock Requirements**: Ensure that the peripherals you plan to use can operate at the lower clock frequencies you're planning to set. Some peripherals might have minimum clock requirements for proper operation.
- **Execution Time**: Your application code will run slower, which could be critical depending on the timing requirements of your application.
- **Peripheral Initialization**: Some initialization codes might assume a certain clock speed. If you change the clock settings, ensure that the initialization code for the peripherals is also updated accordingly.
- **Wait States**: Lowering the system clock frequency might allow you to reduce or eliminate flash memory wait states, which can further reduce power consumption.
- **RTC and WDG**: If you're using the Real-Time Clock (RTC) or the Watchdog Timer (WDG), these peripherals typically use the LSI or LSE, which are independent of the system clock and can operate in low-power modes.

In STM32CubeMX, you can also use the “Power Consumption Calculator” tool to estimate the power consumption with your current settings. This can guide you in fine-tuning the settings for better power efficiency.

Make sure to validate each change in the configuration with the actual hardware setup to ensure that the system behaves as expected. Additionally, refer to the STM32WLE5CCU6 datasheet and reference manual for detailed information on the power characteristics of each peripheral and clock configuration.
