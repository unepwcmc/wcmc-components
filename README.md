# wcmc-components

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```


### Install this package into you project
- Add `"@unep-wcmc/wcmc-components": "1.0.0"` to your package.json
- Run `yarn install`
- In your new project add `import FilterableTable from '@unep-wcmc/wcmc-components'`
- In your new project add `Vue.use(FilterableTable, { store })`

### Pull a component into a project locally
- Clone this repo
- Run `yarn build-lib` to create the library files in the dist folder
- Run `yarn link` to enable you to sync this repo to another

In your **new project** do the following:
- Add the following the the package.json `"@unep-wcmc/wcmc-components": "../wcmc-components",`
- Run `yarn link "@unep-wcmc/wcmc-components"`
- In your js file add `import FilterableTable from 'wcmc-components'`
- In your js file add `Vue.use(FilterableTable, { store })`

### Publish to npm
- 

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

## Docs

### Run docs locally
- `yarn docs:dev`

### Edit the docs
- Run `npm install --global @vuedoc/parser @vuedoc/md`
- Check installation with `vuedoc.md --version`

If you want generate markdown for a component in the terminal type `vuedoc.md` followed by the path of the component. For example:
`vuedoc.md src/components/filterable-table/FilterableTable.vue`

Then copy the markdown out of the terminal and into the markdown file in the /docs folder.
