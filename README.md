# wcmc-components

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

#### Pull a component into a project locally
- Clone this repo
- Run `yarn build-lib` to create the library files in the dist folder

In your new project do the following:
- Add `"wcmc-components": "../wcmc-components",` to your package.json
- Run `yarn install`
- In your new project add `import FilterableTable from 'wcmc-components'`
- In your new project add `Vue.use(FilterableTable, { store })`

### Compiles and minifies for production
```
yarn build

or 

yarn build-lib
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
