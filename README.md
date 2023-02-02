# wcmc-components

## Working with this Repo
### Repo setup
- Clone this repo
- `yarn install`

### Run the repo
- `yarn serve` compiles and hot-reloads for development

### Lints and fixes files
```
yarn lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Publish to npm
- Update version number in `package.json`
- Update the `CHANGELOG.MD`
- Run `yarn build-lib`
- Commit the changes
- Run `npm publish`

## Installing the package into another repo
### Install npm package
- Add `"@unep-wcmc/wcmc-components": "1.1.0"` to your package.json (Or the version you want to use)
- Run `yarn config set registry https://registry.npmjs.org/`
- Run `yarn install`
- In your new project add `import FilterableTable from '@unep-wcmc/wcmc-components'`
- In your new project add `Vue.use(FilterableTable, { store })`

### Install local package
- Clone this repo
- Run `yarn build-lib` to create the library files in the dist folder
- Run either `yarn link` (not working well) to enable you to sync this repo to another OR `yalc push` (working well) to publish your library files to the local yalc repository
  - **in order to use `yalc push` you need to first install yalc, run `yarn global add yalc` in the terminal**


In your **new project** do the following:
- if using `yarn link`
  - Add the following the the package.json `"@unep-wcmc/wcmc-components": "../wcmc-components",`
  - Run `yarn link "@unep-wcmc/wcmc-components"`
- if using `yalc push`
  - Run `yalc add my-component-lib && yalc link my-component-lib && npm install`
- In your js file add `import FilterableTable from "@unep-wcmc/wcmc-components"`
- In your js file add `Vue.use(FilterableTable, { store })`

## Docs

### Run docs locally
- `yarn docs:dev`

### Edit the docs
- Run `npm install --global @vuedoc/parser @vuedoc/md`
- Check installation with `vuedoc.md --version`

If you want generate markdown for a component in the terminal type `vuedoc.md` followed by the path of the component. For example:
`vuedoc.md src/components/filterable-table/FilterableTable.vue`

Then copy the markdown out of the terminal and into the markdown file in the /docs folder.
