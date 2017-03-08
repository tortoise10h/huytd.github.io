# Pok3r Blueooth Hack

The idea of this draft is to create a Blueooth dongle that will work as the power supply and bluetooth connection device for Pok3r keyboard.

## Device Requirements

- Vortex Pok3r Keyboard
- Li-Po battery pack
- Teensy with Bluetooth connection (or something equivalent)

## Diagrams

The current state of Pok3r:

```

 ----- 
|     |>----------------- PC
|  P  |
|  O  |
|  K  |
|  3  |
|  R  |
|     |
 -----

```

The diagram for this hack:

```

 -----  ---                                 
|     ||   |-AC 5V     |                   
|  P  || β |-Bluetooth | . . . . . . . . . PC
|  O  ||   |
|  K  | ---
|  3  |
|  R  |
|     |
 -----

```
