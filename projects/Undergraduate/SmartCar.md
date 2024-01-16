---
layout: pagegallery # 或者是你想要使用的任何布局
title: Competition Project
description: >
  This is the National University Intelligent Car Race competition project, and we won the national first prize.
permalink: /projects/smartcar
---

1. this list will be replaced by the toc
{:toc .large-only}

### Abstract
This project mainly uses a convolutional neural network to realize the regression task and target detection task, complete the prediction of car steering as well as the detection of traffic markers, complete the model training based on the Baidu AIstudio platform as well as the PaddlePaddle deep learning framework and achieve the deployment of the model for the mobile terminal on the edgeboard lite deep learning computing card. This project uses methods such as multi-threaded operation and the automatic collection and organization of markers. Traditional PID algorithms collect data automatically, which effectively reduces the workload of simple repetitive work, significantly improves the utilization rate of the car's computational resources as well as the speed of the program, and realizes that the car runs at high speeds and smoothly on the track.

---

### Subject 1: Follow the Shadow
**Description:** A large number of cones are randomly placed between the starting point and the finishing point of the race area (marked by the red circle in the picture below). At the beginning of the race, the participants will run from the starting point to the finish line, and the car model will follow the participants. The team that reaches the finish line the fastest and doesn't touch the cones in the middle of the race wins.

![Follow the Shadow](/projects/Undergraduate/Smartcar/1.png)

**Penalty rules:**
1. Every time the car model touches the cones on the way to the race, a penalty of 10s will be added.
2. If the car model does not follow the running track of the team members, 100s penalty will be added.
3. The car model stops in the middle of the race and fails.

The score T1 of Subject 1 is: running time from the starting point to the finish line + additional penalty time.
The smaller the T1 time is, the faster it runs, and the better the result is.

<!-- <video id="video" controls="" preload="none" poster="封面">
      <source id="mp4" src="/projects/Undergraduate/Smartcar/1.mp4" type="video/mp4">
</videos> -->

---
### Subject 2: Intelligent Transportation