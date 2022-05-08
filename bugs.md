# known bugs

* when placing a power node, it tries to connect to *every* wall tile
* when you have a conveyor moving items in the main world, going into a factory-building crashes
	+ not the other way around - you can move items in the building without the main world crashing
* the building's cores and the main cores sync, but shouldn't
* the building's cores don't sync materials with the building block
* you can't exit a building if you leave then reenter mindustry while in a building 
* occasionally, mindustry crashes with `java.lang.RuntimeException: No stat entry found: "buildTime" in block`

## fixed bugs

* the floor tile uses the wrong texture
