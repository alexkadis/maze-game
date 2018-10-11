# Maze Game
The goal is to create a multi-level maze game with moving walls

Trying to re-work it using oop, allowing me to follow the instructions on [Maze Generation: Growing Tree algorithm](http://weblog.jamisbuck.org/2011/1/27/maze-generation-growing-tree-algorithm)

# starting-point.js 
- From http://jamisbuck.org/mazes/minecraft.html
- It's a good starting place, but ultimately I'm re-doing it my way

# AirBNB style guide
https://github.com/airbnb/javascript

# The process I'm going for
1. Choose a starting point along the top
2. Choose a direction at random, if you can't go that way, choose a different direction
3. Once you find a direction you can go: 
	- Add it to the list of cells
	- Add the cell to the grid
4. Keep going until you can't move in any direction
5. Backtrack until you can go another direction
6. Repeat 2-4 until you've filled the entire maze (number of cells left is 0)

##Algorithm
Cells have all directions (north, east, south, west, up, down) which refer to different cells or "wall" 
- Edges are `wall`

###When you loop:
If it's an empty cell, instead of cardinal direction, it'll be a cell reference

1. new cell's relative direction refers to this cell
2. this cell's relative direction refers to the new cell. If it's not an empty cell, the direction will be `wall`

### Display
1. Loop through the grid (z, y, x)
2. If a direction is a wall, set that border wall (top border, east border, south border, west border)
3. "overlapping" mazes, when you hit the up/down buttons, it changes the level you're on

# TO DO
1. Choose a starting and ending point to the maze, where doesn't exactly matter, as long as they're on opposite sides, no matter what, you can get to any part of a maze (that's how mazes work...)
2. Might want to go to using canvas and making it look *good*
3. Unit tests https://journal.artfuldev.com/write-tests-for-typescript-projects-with-mocha-and-chai-in-typescript-86e053bdb2b6
	1. https://medium.com/@FizzyInTheHall/run-typescript-mocha-tests-in-visual-studio-code-58e62a173575
	2. https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2
	3. https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40