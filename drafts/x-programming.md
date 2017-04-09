# Notes on X Window System Programming

## Overview

X is a network-based windowing system, applications can run in a network of systems from different vendors. Programs can be run on a remote computer and the results displayed on a local workstation.

X11 is the alias of X version 11, which was first released in September 1987.

The X subroutine library (Xlib) is the library used to write programs for X environment.

## X Window System Concepts

- **Display:** is a workstation consisting of a keyboard, pointing device (mouse, touchpad,...) and _one or more_ screens.
- **Client:** or _applications_ is the user programs.
- **Server:** Is a program that control each _display_, it allows access to the _display_ by multiple _clients_, pass _user input_ to _clients_, render graphics content (such as UI) of a _client_,...
- **Window:** a region that a _client_ is being draw.
- **Window Manager:** a program written with Xlib, it is given a special authority to control the layout, the appearance or the UI style of _windows_ on the screen. (i3, dwm,...)
- **Event:** is a user input (mouse click, mouse move, key press,...) or interaction with other programs (window move, window resize, window close,...).
- **Extensions:** X is _extensible_. It allows both client-side and server-side codes to be executed at the same level as Xlib routines to define new behaviors of X.

## X Window System Architecture

```
.-------------.  .------------------.  .-------------.
|   Client    |  |      Client      |  |   Client    |
| Application |  | (Window Manager) |  | Application |
|-------------|  |------------------|  |-------------|
|    Xlib     |  |       Xlib       |  |   Toolkit   |
`-------------'  `------------------'  |-------------|
      |                    |           |     Xlib    |
      |                    |           `-------------'
      `---------------.    |                  |
                      |    |    .-------------'
  X Window System     |    |    |
  protocol requests   |    |    |  Events and replies are
  sent from clients   |    |    |  passed back to Clients
                      |    |    |
  ======================================================= NETWORK
                      |    |    |
                  .----------------.
                  |    X Server    |
                  |----------------| ====> DISPLAY DEVICE
                  | Device Drivers |
                  `----------------'
```

Clients communicate with the X server by calling to the low-level C library named Xlib. This library provides functions for _connecting to a particular display server_, _creating windows_, _drawing graphics_, _responding to events_,... 

Xlib calls are translated to network requests following the X Window System Protocol and sending to X server.

_Toolkits_ is a set of higher level subroutine libraries, implement a set of UI features such as menus or command buttons (aka _toolkit widgets_), and allow applications to manipulate these features using OOP techniques. 

## Xlib

As mentioned in previous section, Xlib is a low-level C library provides us many functions to work with the X Server. The functions can be grouped as: 

```
- Color                                 - Cursors
- Data Management                       - Display Connection
- Display and Server Specifications     - Drawing
- Errors                                - Events
- Extensions                            - Fonts
- Geometery                             - Graphic Context
- Host Access                           - Images
- Interclient Communication             - Internationalization
- Keyboard                              - Pointer
- Regions                               - Resource Management
- Screen Saver                          - Text
- User Preferences                      - Window Attributes
- Window Life                           - Window Management
```
