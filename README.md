---
layout: home
permalink: index.html

# Please update this with your repository name and project title
repository-name: e18-3yp-non-invasive-glucometer
title: Non Invasive Glucometer
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Non Invasive Glucometer

---

## Team
-  E/18/170, Karunarathna W.K., [e18170@eng.pdn.ac.lk](mailto:e18170@eng.pdn.ac.lk)
-  E/18/282, Ranasinghe R.A.N.S., [e18282@eng.pdn.ac.lk](mailto:e18282@eng.pdn.ac.lk)
-  E/18/382, Weerarathne L.D., [e18382@eng.pdn.ac.lk](mailto:e18382@eng.pdn.ac.lk)

<!-- Image (photo/drawing of the final hardware) should be here -->

<!-- This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/) -->

<!-- ![Sample Image](./images/sample.png) -->

#### Table of Contents
1. [Introduction](#introduction)
<!-- 2. [Solution Architecture](#solution-architecture ) -->
2. [Hardware & Software Designs](#hardware-and-software-designs)
3. [Links](#links)

## Introduction

With the rise of global diabetes among the older generation, the International Diabetes Federation (IDF) statistics show that one in every 12 adults in Sri Lanka are suffering from diabetes. Severe diabetes can even cause death or serious complications like stroke, amputation, kidney failure, heart attack, and heart failure. Therefore, it should be monitored and the way to monitor diabetes is to measure blood glucose levels regularly to keep it under control.

For a diabetic patient having type 1 diabetes, it is recommended to measure blood sugar 4 - 10 times a day. People with type 2 diabetes should take blood sugar testing at least once a day. The currently available and mostly used method is the invasive glucometer which is painful, can cause damage to the blood vessels, and can cause infections. They are also costly as the strips need to be replaced over time.  

The aim of this project is to eliminate these drawbacks and build a convenient method for frequent glucose monitoring. For that we will be using the Near Infrared Based method which is non invasive, portable, cost efficient, reliable, and accurate to a considerable extent.

<!-- 
## Solution Architecture

![Sample Image](./images/system.jpg)

### Data and control flow

![Sample Image](./images/dataflow.jpg) -->
<!-- High level diagram + description -->

## Hardware and Software Designs

The hardware design comprises of following componets.
- Main processing unit Atmega328p Microcontroller
- NIR emitter of 940 nm wavelength
- Main two sensors NIR detector and Touch sensor
- LCD display
- Bluetooth module
- Batteries to supply constant power to the emitter

The software design has both a mobile and a web interface for two differnet users patients and the doctors.
Features of the mobile application are,
- User-specific accounts
- Get a graphical representation of real-time glucose variation
- Track previous glucose levels
- Issue alerts on users' diabetic conditions
- Get health tips to control diabetes 

Features of the web application are,
- For the use of doctors to track the patients' blood glucose levels and diabetic conditions
- Track patients' diabetic history if the user consents

<!--
Detailed designs with many sub-sections

## Testing

Testing done on hardware and software, detailed + summarized results -->
<!--
## Detailed budget

All items and costs

| Item          | Quantity  | Unit Cost  | Total  |
| ------------- |:---------:|:----------:|-------:|
| Sample item   | 5         | 10 LKR     | 50 LKR |

## Conclusion

What was achieved, future developments, commercialization plans -->

For more details visit our official project page from the below links.

## Links

- [Project Repository](https://github.com/cepdnaclk/{{ e18-3yp-non-invaisve-glucose-meter }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ e18-3yp-non-invaisve-glucose-meter}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
