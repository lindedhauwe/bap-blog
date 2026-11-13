---
title: Development consult
date: 2026-11-13
description: We prepared a technical plan for our controllers and docking station, and the development expert desk helped us choose a framework, controllers and a way to hand the game over to Boektopia.
tags: [development, feedback]
olr: [OLR02-I-1, OLR04-I-2, OLR08-I-1]
ai: >-
  We asked Claude (AI) how to build our controllers and docking station technically. Its answer is on our board, next to yellow sticky notes with our own conclusions in our own words. Claude also turned our Dutch notes of the consult into this English post. The feedback comes from the development expert desk.
---

## Preparation: controllers and docking station

Before the consult, we worked out how our installation could work technically. Our idea: one **docking station** shaped like a stack of books, with a **loose controller** on each side. The controllers detect movement for actions like tickling, steering or casting a spell. The docking station has a button for each player.

We asked Claude (AI) to help us with the technical side: what we need, how to connect it all, and which materials to use. We put its answer on our board and wrote our own conclusions next to it on yellow sticky notes:

- **Architecture:** a pole with two buttons on top. The two controllers are connected to it with a USB cable on the outside. Everything goes to a mini-PC inside the docking station, which runs the game and sends the image to the LED wall. Everything is wired, so there are no batteries and no Bluetooth or wifi problems on a busy fair floor.
- **Controllers:** simple staffs, with no special shape, because they get their look on the screen. Inside are a motion sensor and a microcontroller that send the data to the computer over USB. Extras like rubber edges or a vibration motor can make them more fun to use.
- **Cables:** the staffs hang on cables that also carry data and power. Spiral cables would be ideal for this. The length must not become a risk for children.
- **Docking station:** a pole styled as a stack of books, with an open book on top and a button on each page. The cables come out on each player's side, and one covered cable at the bottom goes straight to the screen.
- **Software:** children will do simple actions, so the game shouldn't expect precise movements.
- **Costs:** if we had to buy everything, the estimate is about €715 to €1,555. If Boektopia already has some parts, we could borrow them. We could also use a honeycomb cardboard casing around a simple wooden pole, which would be cheaper.
- **Sustainability:** standard parts that are easy to replace or repair, no batteries, FSC wood, and a modular build that can travel between the two locations.

![Our board "Controllers & docking": our prompt to Claude on the left, its answer in eight parts (architecture, controller, cable, docking station, software, phases, costs and sustainability) and our yellow sticky notes with our own conclusions next to each part](./controllers-and-docking.jpg)

### Our questions

1. Which framework should we use for the games: Unity, Godot or three.js?
2. Should it be an app or a website?
3. Should we keep an AI logbook?
4. How do we hand the game over to the client?

## Feedback

### Framework: Phaser

- The expert still thinks **Phaser** is the best framework for making games like ours. It's just JavaScript, and our style will work well with it.
- We should **compare it with the other options** and write down why we chose it.

### Controllers

- Using a real Wii Remote is very hard.
- A **Wii Nunchuk** (the part with the joystick) is possible. It has an accelerometer that measures its position, but it works with a cable, so it's always attached to something.
- Another option is a **separate accelerometer**, but then we have to add a cable ourselves.
- We need **everything twice**, once for each player.
- **Order early.** Find out as soon as possible which materials are an option, compare them and their prices, then order and start trying them out. Delivery times are long, so don't wait for the design.
- Nothing in our plan seemed impossible. We don't use a camera, which makes it easier.
- We could also think about **a block with buttons built into it**.

### Handing the game over

- **Ask the client whether they will provide the computers.**
- Put the whole package in one folder, with a small script that opens the game with a double-click, so the client doesn't have to deal with code editors.
- Run it **locally, preferably without internet**. If the internet goes down at the fair, the game would stop working.

### Jury

- We can show the game on a TV screen, a projection or something similar. A **technical demo is enough**.

### Logbook and AI use

- We don't need a separate AI logbook. Keeping track of our process on this blog is enough.
- **Using AI is fine.** The jury knows that AI will be used a lot, so they won't be amazed that a game works. What matters is a **really well worked-out concept**.

## What did we learn?

Our questions were mostly answered: we'll use Phaser, run the game locally and offline instead of online, and keep our process on this blog. The biggest lesson is about time. Hardware takes long to arrive, so we have to choose and order our controllers now, not after the design is finished.

## Next steps

- Set up our code: start a Phaser project for the games and begin with small tests.
- Compare Phaser with Unity, Godot and three.js, and write down why we chose it.
- List our controller options (Wii Nunchuk, separate accelerometer, a block with buttons), compare prices and order as soon as possible.
- Ask Boektopia whether they will provide the computers.
- Plan a handover folder with a script that starts the game offline.
