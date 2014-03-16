# Community Mapping

## Definitions

Exhibition => An event at which the Community Mapping platform has been set up.

Visitor => A user of the community mapping platform.

Curator => The organiser of an exhibition, who will have control over the large-screen display.

## Overview

A platform that allows ehibition visitors to take part in creating a map of a given area. Visitors will use touch-screen kiosks to explore a map and styli to draw onto the map.

A projector or large screen will also be present in the exhibition area showing an overview of the map, updated in real-time as visitors add to it. This view of the map could also display an animated timeline of how the map has built up over the course of the exhibition.

## Specification

The platform will consist of the following:

### The MapDrawView

This will be the only view that is used within the mobile app. Visitors will be able to zoom in and out of the map.

When they are zoomed right in, a 'Draw' button will appear. When the visitor presses the Draw button, this will put the view into Draw Mode and the visitor will be able to draw onto the map using a stylus or their fingers. Zooming and panning the map will be disabled in Draw Mode. A toolbar will also appear, allowing them to change the brush colour and width. When they are finished, they can press 'Done' and they will be taken out of Draw Mode and will able to pan and zoom the map once again.

The canvas will be slightly translucent so that the map will still be visible underneath the drawings.

While in draw mode, 'Stylus Up' interactions will trigger other clients' view canvases to update. This means that when a user finishes drawing a line, the other kiosks views of the map will be updated with that line.

A visitor will be able to erase what they are drawing, but once they tap 'Done' they will not be able to change what they've drawn.

### The MapViewView

This will be a fullscreen, zoomed out view of the map, updating in real-time as visitors draw onto it.

### The MapTimelineView

This will be an animated view of the map, showing how it has built up over the course of the exhibition. It will run in a loop, beginning with an introductory message. It will take a given start date/time and pull down all of the changes that were added since that time until the present time. It will then update the map with each change, one per 0.2s (or an interval determined by the time range specified).

## Technology

The following technologies will be used:

### Hardware

* Multiple tablets running the Android OS

* A single laptop running the Google Chrome browser

* A large screen or projector

### Software

* Phonegap - a package that allows you to created web-based applications and build them as mobile applications on a variety of platforms, including iOS, Android, Windows Phone and Blackberry.

* Google Maps API - Allows you to embed Google maps into a web page in a highly flexible way, specifiying the map coordinates, the zoom level and the control tools that are availble, among other things. The latest iteration gives you complete control over the map colours.

* HTML5 <canvas/> - the new canvas element in HTML5 provides a native, high-performing and reliable method for implementing graphics on a web page. An HTML5 element would be placed on top of the Google map element.

* An HTML5/JS drawing plugin (not yet specified)

* Backbone.js - an MVC web application platform.

* Node.js - a lightweight JavaScript backend platform.

* Socket.io - a JavaScript library for real-time updating.

* MondoDB - a lightweight NoSQL document database.
