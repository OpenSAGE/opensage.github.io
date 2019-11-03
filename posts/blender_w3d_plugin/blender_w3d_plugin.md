---
slug: "blender-w3d-plugin-2018"
title: "A Blender W3D Plugin"
summary: "Import & Exporting W3D files into Blender"
author: "Stephan Vedder"
date: "2019-11-05"
---

As we've already announced in our latest post, we're working on a **W3D Blender Plugin**. We strongl  **??**

You probably already know that the Westwood 3D (W3D) format is the 3D format used in the first games that were created with the SAGE engine (later on replaced by a serialized version called W3X). One big issue with that format used to be that there are very little tools that allow authoring of these files. The offical modding SDKs contained plugins for old Autodesk 3dsmax versions (which were recent at the time). The issue is that Autodesk 3dsmax is a commercial tool and the offical plugin is not available for current versions anymore. Apart from this it was lacking some features the community desperatly needs, like the import of compressed animations.

As a conclusion of this we decided to write an opensource Blender Plugin, which allows to export and import W3D files. Our existing W3D code from OpenSage was a big advantage, since it helped us getting a strong understanding of the format itself.

# Why Blender

With the latest major Blender 2.8 release it became the first choice for opensource modelling software. Big companies like Epic, NVIDIA, AMD and Ubisoft have decided to fund the development of Blender. Due to the open Python API documentation it's also easy to write plugins that interact with the software.

![Blender Logo](./blender_logo.png)

# How it works

*This walkthrough assumes you know how Blender works and how to use it*

As a user of the plugin you just want to install the latest version of the plugin, which can be found [here](https://github.com/OpenSAGE/OpenSAGE.BlenderPlugin/releases). Through the preferences window you can select that zip archive to be installed. The import and export submenus now contain entries for the `*.w3d` format.
During import of a model it's important that all references files (Skeleton & Textures) can be found, so they must be in the same folder as the file you want to import.

## Import

So at first we'll start by importing a simple structure, like the Gondor Barracks from Battle for Middleearth:
![Gondor Barracks](./barracks.png)

The model as you can see it in the screenshot above is in it's default state. As you can see in the scene collection on the right we've create a parent collection for all meshes that are part of the `W3D` file. Since materials in Blender 2.8 are completly node based the plugin automatically creates a node based shader setup that matches the material specified inside the model. See below for the barracks shader node setup, which uses a diffuse and normal texture.

![Gondor Barracks Shader](./barracks_nodes.png)

Since there are many material options, which are specific to `W3D` we added two new property groups to the material section of each object. The properties there are similar to previous W3D plugins! At the moment those properties have no effect inside blender, but are mandatory for our goal of a lossless file import -> export workflow.


Let's continue by importing a simple skinned model, like the Cave Troll from Battle for Middleearth:
![Cave Troll](./cave_troll.png)

So let's take a closer look on what happened here. During import the skeleton is automatically loaded and applied to to the mesh (in the scene collection it's named `MUCAVTROLL_SKL`). The pose that you can now see is the so called **Rest Pose**, which means that no animations are applied to the hierarchy.
