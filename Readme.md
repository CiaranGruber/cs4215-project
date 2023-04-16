# An Interpreter for C
This project aims to implement an interpreter using the explicit-control evaluator model in order to run a sublanguage of C ensuring that the memory model is as expected. The build instructions can be seen below

# Build Instructions

In order to build the project, it is recommended to have the `npm` package as v8.5 or above. Additionally, this project has been tested with Node.js `v18.16.0`. In order for things to build correctly, it is recommended that these are followed.

## Steps to set up the project

1. Clone into a directory using `git clone https://github.com/CiaranGruber/cs4215-project`
2. Install required package dependencies using `npm install`
3. Build the project using `npm run build`
4. To fix the TypeScript/Node bug where imports are not recognised, do `npm run build` to both compile to TypeScript and fix import statements

## Commands Available

1. `npm run build` will compile the TypeScript into the relevant JavaScript files
2. `npm run test` will run the appropriate Jest tests
3. `npm run compile-g4` will compile the C.g4 file into the appropriate parser and lexer files

## Primary functions

- The parser has been named the `antlr_parser.ts` under the parser directory
- The evaluator can be found under the `explicit_control_evaluator` directory
- The main runner for the program that parses and compiles is under `runner` and named `runner.ts`