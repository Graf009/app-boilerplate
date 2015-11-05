# <name>

> <dest>

### Installation

You must have npm installed globally before running the following command.

```sh
$ git clone <git>
$ cd <name>
$ npm install
```
### Application config

By using the *APP_CONFIG* can specify the configuration file.
Configuration files are located in the *src/config/environments*.

For example:
`$ APP_CONFIG=local npm run dev` — run with the settings from *src/config/environments/local.js*

### Usage

* `$ npm run build` — create a production ready snapshot ( ./public )
* `$ npm run dev` — start a development server (watch and hot reload modules)
* `$ npm run lint` — check style code
* `$ npm run deploy` — archiving app snapshot ( ./dist )

### Folder Structure

* src/ 			— where all the source code live (JSX and CSS)
* assets/ 		— where all static assets live
* public/ 		— all compiled code
* dist/ 		— production level code in archive

__Note__ : assets/ and src/ will be compiled into public/ folder when you run build command
