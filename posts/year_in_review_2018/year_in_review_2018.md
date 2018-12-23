---
slug: "year-in-review-2018"
title: "Year in Review 2018"
author: "Paavo Huhtala"
date: 2018-12-22
---

_OpenSAGE is an open source re-implementation of the SAGE game engine, which was used for multiple Electronic Arts RTS games in mid-to-late 2000s. Our current focus is on Command & Conquer™: Generals. For more information visit our [About](/) page._

It has been a great year for OpenSAGE. It saw our first release, the implementation of many important features, the beginning and continuing growth of our community and the shift from a single developer's hobby project towards a proper open source team effort.

So far in 2018 OpenSAGE has received about **850 commits** from **10 contributors**, not counting unmerged PRs at the time of writing.
Our [Discord](https://discord.gg/G2FhZUT) server (which was created in early January) has almost **200 users**. We got featured on [GamingOnLinux](https://www.gamingonlinux.com/articles/opensage-an-early-wip-game-engine-for-command-conquer-generals-adds-linux-support.12025), mentioned on various social media sites, and even got discussed about in Chinese and Russian C&C communities.

Here's the commit graph for the main repository from December 2017 to December 2018, grouped by week.

![Commit graph for the past 12 months](./commits.png)

The first few months of the year were some of the most productive in the project's history, and active development continued throughout spring.
After a slow summer and a quiet autumn the development pace has picked up again, and we've reached last year's activity peak again.

## What've done this year

We are not going to go through every change that happened during the year, as there's way too much to cover, but I tried to pick the most important ones.
I recommend preparing by making a cup of a seasonally appropriate beverage of your choosing before continuing. It's going to be a long one.

### January

Tim started the work towards making the engine truly cross-platform. The unfinished macOS-specific Metal renderer was removed, and Windows-specific libraries and technologies were started to be replaced with cross-platform equivalents. First few shaders were ported from HLSL to C# using [ShaderGen](https://github.com/mellinoe/ShaderGen), and we adopted [SDL2](https://www.libsdl.org/) for window creation and input handling. Tim also continued his work on parsing game archives and assets, started redesigning our scene graph and made various fixes and optimizations.

Stephan focused his attention on APT, the Flash-based UI system used in later SAGE titles. This involved building parsers for various file formats, implementing UI views for the data viewer, and even implementing a virtual machine for ActionScript bytecode.

Perhaps the most important change I made in January was the game launcher executable. While a simple feature consisting of a few dozen lines of code, it brought together many features that had been built during the previous months. I also rewrote our scripting system (based on days of testing of various edge cases), implemented [Catmull-Rom spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull%E2%80%93Rom_spline) interpolation to make scripted cameras super smooth, and moved a lot of the game-specific code from `OpenSage.Game` into separate mod DLLs.

I also got to draw some vaguely accurate [sequence diagrams](/assets/year-in-review-2018/sequential_call.svg).

As the result of these features, we could start the game from an executable and see the main menu with the shell map on the background with a rotating camera. Some parts of the menu were already interactive (as [this 8-second video](https://www.youtube.com/watch?v=P2Nxk4J7gkE) demonstrates).

<div class="video-responsive">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/inNFkmGIdvQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### February

In early February Tim replaced our hand-written D3D11 renderer with [Veldrid](https://github.com/mellinoe/veldrid), a cross-platform graphics API abstraction library by [Eric Mellino](https://github.com/mellinoe). This was not by itself enough to make OpenSAGE run on macOS and Linux as most of the shaders were still written in HLSL, but it was definitely the right choice and one of the most important changes the project has seen to this day. Tim also started parsing replay files (which he wrote [a blog post](/blog/replay-file-parsing/) about the following month). Being able to decode replays is very useful to us, as they offer a look at the inner workings of the engine, such as what sort of data is sent between players in a multiplayer match. He also did a lot of refactoring, implemented visual features such as cloud shadows and macrotextures, and improved our implementation of WND, the UI system used by Generals.

<div class="video-responsive">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_QM3T_zU66E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Stephan continued his work on APT; new instructions were implemented for the ActionScript VM and rendering was improved. He also began the work on audio support, starting with a hand-written WAV parser and a data viewer UI for previewing sounds. The engine was now able to render Battle for Middle Earth II's main menu without crashing.

<div class="video-responsive">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Lo1iqrUP6GQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I implemented a way to select objects with the mouse, which really just made game objects smaller when you clicked them. This required parsing bounding box/cylinder/sphere data from INI files and writing new maths code for ray-shape intersections. I also optimized particle systems to consume less memory and generate less garbage, and added the ability to export data files from game archives.

In early February on the 15th anniversary of C&C Generals we had our [first ever release](/blog/dev-diary-6-first-release/). While limited in functionality and only working on Windows, it was an important milestone for us. 

### March

In March Tim finished the shader porting work that begun in January, and as a result was able to retarget the engine to use .NET Core instead of the Windows-only .NET Framework (as we no longer required the DirectX Shader Compiler). These changes meant that OpenSAGE was finally able to run on all platforms Veldrid supports, at least in theory. He also added a prototype version of the in-game control bar; the bit of UI that covers the bottom of the screen. I was mostly busy with coursework at this point, but I managed to add the `Player` class, which as the name implies is the runtime representation of a player.

![Somewhat broken control bar](./control_bar_1.png)

In March we also had two new contributors: [Evgeny Ivchenko](https://github.com/SomeAnon42), who made some audio-related fixes; and [Nostritius](https://github.com/Nostritius), who implemented an environment variable-based installation locator. While they were small changes, they were very important — the engine was finally technically cross-platform, but it couldn't have done much without a way to specify where to load game data on operating systems that don't have the Windows Registry.

### April

While March was a bit quieter than the preceeding months, progress sped up in April.

Tim tackled two larger features in April:
1. macOS support. While the engine technically could run on macOS at this point, things are rarely that easy — supporting macOS required various fixes to rendering, shader compilation and file handling.

![OpenSAGE running on macOS](./macOS.png)

2. Data viewer rewrite. At the time the data viewer used [Eto.Forms](https://github.com/picoe/Eto), a cross-platform Windows Forms -esque UI framework. While it had worked well enough for our use for a while, in February we encountered issues when trying to port it to Linux. Our approach to embedding a game view into the app only worked with Direct3D (and possibly Metal), but at the time there was no easy solution for embedding an OpenGL view. Intrigued by stories of easy embeddability and great productivity, we made the decision to port the data viewer from Eto.Forms to [Dear ImGui](https://github.com/ocornut/imgui) instead of continuing to struggle with Eto.Forms. Dear ImGui (oftentimes called just `imgui`) is an [immediate mode](https://en.wikipedia.org/wiki/Immediate_Mode_GUI) UI framework specifically designed for rapid development of game engine and content creation tools. It didn't take long to re-implement the basic file browser, and the port was finished in just a few days. Here's the very first screenshot of the new data viewer:

![OpenSAGE Viewer ported to Dear ImGui, first screenshot.](./imgui_0.1.png)

**Trivia**: This wasn't the first time the data viewer had been rewritten. It started out as a snazzy-looking [WPF](https://en.wikipedia.org/wiki/Windows_Presentation_Foundation) app (which you can see in the [first dev diary](/blog/dev-diary-1)), but in November 2017 it was ported to Eto.Forms for macOS and Linux support. We like rewriting things.

Oh, and Tim also started working on road loading & rendering.

![First prototype of road rendering in OpenSAGE](./roads_1.png)

Stephan tweaked our [AppVeyor](https://www.appveyor.com/)-based CI pipeline, and added code coverage analysis using [Codecov](https://codecov.io/).

I worked on a bunch smaller features during April. I started by implementing a `Team` class to accompany `Player`, and implemented parsing for both from map data. Then I implemented the first actual game mechanic of the project: a prototype of the unit selection system, including single and multi ("box") selection. Here's what the first version looked like:

<div class="video-responsive">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/SmVQ4tYIWnQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I continued working on the control bar Tim had started the previous month. I removed a few controls, added some others, made the bar change certain textures based on the faction of the current player and fixed a few bugs in the WND implementation. I even implemented the somewhat pointless minimize button. It looked rather convincing already:

![Almost real looking control bar](./control_bar_2.png)

#### Adventures in input handling

To make camera movement, selection and the UI all work together with regards to player input, I had make some changes to input handling. Until this point we had used a list of `InputMessageHandler`s in a fixed but hard to control order — engine subsystems registered input handlers by pushing them to the input handler list, either to the start or the end. Each input message was passed to each handler in order, and the handlers could choose if they mark the event as handled or not (which stops further propagation of the event).

However, the issue was that the event handling order was fixed, which isn't always the case. For instance: the UI input handler should normally be the first system to handle mouse events. This makes sense, as clicking a button in the navbar should call the button's click handler instead of selecting a unit hidden behind the UI. However, when panning or rotating the camera (or making a box selection) the UI should ignore your mouse events. Beforehand this was handled by building special cases to input handlers, which meant that the camera system had to know about the selection system, and vice versa, making it hard to maintain.

The solution was rather simple: somewhat inspired by operating system [interrupt handlers](https://en.wikipedia.org/wiki/Interrupt_handler) I assigned each handler a priority value, which they can change at will if need be. Priority values are just entries in an enum, so the handling order is easy to understand at a glance and trivial to rearrange at will. In practise this meant that, for example, the selection system can increase its priority to be higher than the UI system's when the user is making a box selection. Input handlers are iterated in their priority order each frame, and messages are handled like before.
