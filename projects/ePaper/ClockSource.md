---
layout: newpage
title: Clock Source
permalink: /projects/epaper/minimumboard/clocksource
---

The crystal’s load capacitance ($$C_L$$) is determined from the data provided by the crystal manufacturer. For the crystal to operate at the specified load capacitance, this capacitance value needs to be implemented in the circuit.

In an actual circuit, the load capacitance on both sides of the crystal (we can call them $$C_1$$ and $$C_2$$) is not only related to the crystal's load capacitance ($$C_L$$), but also takes into account the parasitic capacitance (usually in the order of a few pF) of the microcontroller's pins and PCB alignment. The formula is roughly as follows:

$$
C'_L=2 \times (C_{1,2}-C_{stray})
$$

Where $$C'_L$$ is the load capacitance value given in the crystal specification sheet, $$C_{1,2}$$ is the capacitance to be installed in the actual circuit on both sides, and $$C_{stray}$$ is the parasitic capacitance of the microcontroller pins and PCB alignment.

To get the total $$C'_L$$ required, the capacitance of each side $$C_{1,2}$$ should be slightly larger because the parallel equivalent of the two capacitors is affected by the parasitic capacitance of the PCB alignment.