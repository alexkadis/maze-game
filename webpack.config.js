module.exports = {
	entry: [
		"./src/Cell.ts",
		"./src/Character.ts",
		"./src/Maze.ts",
		"./src/MazeView.ts",
		"./src/main.ts"
	],
	output: {
	  filename: 'bundle.js'
	},
	resolve: {
	  extensions: ['.ts', '.js']
	},
	module: {
	  rules: [
		{
		  test: /\.tsx?$/,
		  exclude: /node_modules/,
		  loader: 'awesome-typescript-loader'
		}
	  ]
	}
  }