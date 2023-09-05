# Age vs radius

Since one of the main goals of this tool is to support all known tectonic
transitions over time, it's important that the radius can increase, decrease or
remain constant for some of the time or all of the time. Many hypotheses
existing including:

- fixed-radius earth

  e.g. plate tectonics

- pulsating earth

  Alternating expansion and shrinkage over time, and

- expanding/growing earth

  Covering many hypothesis and having alterative expansion rates depending on
  the theory.

To support all of the above, it must be possible to track position, rotation and
deformation of surfaces at different radii and then map those to correspending
digital ages to examine and adjust the output.

## User interface

To start with we'll propose how this could look in the user interface. Modelling
should start with the radius. The user should be able to add new earth state and
define the radius for that state. By default, an existing state should be copied
(typically starting with the present). If that state is copied to a planet of
different radius, the software will make a rudimentary attempt to adjust the
surface curvature of the copied features based on the current algorithm for
doing so[1]. In future, the user should be able to provide their own algorithm
or choose from a number of options.

From there the user should be able to start modeling. For now that implies,
translating and rotating feature collections (sets of geojson regions, points
and linesStrings for the current radius) on the surface. Using the software, it
should be possible to animate the region boundaries from one state to the next
in steps of changing radius. Later, when the radial states are mapped to
historical ages (in mya units), it should be possible to animate at desired
rates in time and space. e.g. 1 mya/second.

[1] Current algorith to be documented.
