---
layout: page # 或者是你想要使用的任何布局
title: Competition Project
description: >
  This is the National University Intelligent Car Race competition project, and we won the national first prize.
permalink: /projects/smartcar
---

1. this list will be replaced by the toc
{:toc .large-only}

### Abstract
This project mainly uses a convolutional neural network to realize the regression task and target detection task, complete the prediction of car steering as well as the detection of traffic markers, complete the model training based on the Baidu AIstudio platform as well as the PaddlePaddle deep learning framework and achieve the deployment of the model for the mobile terminal on the edgeboard lite deep learning computing card. This project uses methods such as multi-threaded operation and the automatic collection and organization of markers. Traditional PID algorithms collect data automatically, which effectively reduces the workload of simple repetitive work, significantly improves the utilization rate of the car's computational resources as well as the speed of the program, and realizes that the car runs at high speeds and smoothly on the track.

**Keywords:** Stm32f4, PaddlePaddle, Deep Learning, Multi-threaded Operation, PID Algorithm; C; python

---

### Subject 1: Follow the Shadow
**Description:** A large number of cones are randomly placed between the starting point and the finishing point of the race area (marked by the red circle in the picture below). At the beginning of the race, the participants will run from the starting point to the finish line, and the car model will follow the participants. The team that reaches the finish line the fastest and doesn't touch the cones in the middle of the race wins.

![Follow the Shadow](/projects/Undergraduate/Smartcar/1.png)

<!-- **Penalty rules:**
1. Every time the car model touches the cones on the way to the race, a penalty of 10s will be added.
2. If the car model does not follow the running track of the team members, 100s penalty will be added.
3. The car model stops in the middle of the race and fails.

The score T1 of Subject 1 is: running time from the starting point to the finish line + additional penalty time.
The smaller the T1 time is, the faster it runs, and the better the result is. -->

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4_PA3ReFOJE?si=3uwyQzXKOHkl8KH3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---
### Subject 2: Intelligent Transportation

**Description:** At the beginning of the race, the car starts from the starting point, drives along the lane line, needs to recognize traffic lights, straight signs, speed limit sections, left and right turn signs on the way, travels for two laps, and finally returns to the endpoint (the same position as the starting point), and the one who takes the shortest time while complying with the traffic rules wins the race.

![Intelligent Transportation](/projects/Undergraduate/Smartcar/2.png)

<!-- **Penalty rules:**

1. After the car recognizes the red light, it should stay in front of the crosswalk for 2 seconds and wait until the red light changes to a green light; if the car fails to recognize the red light or stays less than 2 seconds after recognizing the red light in the course of the race, it will be penalized by an additional 10 seconds. Note on traffic lights: While the car is running two laps, there will be a random lap to see a red light and another to see a green light.
2. In the section of the track where the speed limit sign and the speed limit sign are canceled, the unmanned car should run at XX speed; if it runs over this speed in this speed limit section, a 10-second penalty will be added.
3. Need to recognize the straight ahead mark; in this kind of track, the car needs to go straight forward; if it turns or other violations, add 10-second penalties.
4。 When the car is running in the last lap, the right-turn mark in the track will automatically change to a left-turn mark, and the car will turn left and enter the parking area (the original starting position). When the car reaches the finish line and stops, it needs to cross the finish line, and at the same time it needs to stop in front of the stop sign, if it touches the stop sign or fails to cross the finish line, it will be penalized with 10 seconds. (Stop sign can be detected by ultrasonic wave)
5. If the car model crosses the sideline and runs out of the track (all four wheels are outside the track), stops in the middle of the run, or runs on the wrong route, the race will be counted as a failure.
6. The result will be invalidated if the car is subjected to human intervention during the race (except for sending the start command).
The T2 of the race is the time of 2 laps from the starting point to the finish line + the penalty time.
The smaller the T2, the faster the run and the better the result. -->

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/3yYeCNeEOV4?si=wjrN3QCr0v4-KTDl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/e_lOpXOA9nw?si=AUgY_SYM-PWBurd3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qEuZWMHkHKU?si=J0qQF-_Ys76DalB2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>