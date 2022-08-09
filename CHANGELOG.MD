### 2.2.5

- Fix: add .node-version and .tool-version files

### 2.2.3 / 2.2.4

- Added:
  - Page buttons in the pagination component, implemented via a key in the existing `options` prop: `pagination.numberOfPageButtonsToShow`, which can be set to any odd number. If this key doesn't exist, the pagination will only display the arrows buttons.

### 2.2.2

- Fix: Remove page buttons (numbers) from pagination

### 2.2.1

- Feature:
  - Allow the modal to display a list in a bulletpoint style or inline style, implemented via a key in the existing `options` prop: `modal.bulletDisplay`, which can be set to true to have bulletpoint style or false to have inline style (with words separated by a semi-colon)
  - Make URLs hyperlinks, styled in blue
  - Give the option to pin one filter option to the top of any filter, implemented via a key in the existing `options` prop: `filters.optionToPinAtTheTop`, which can be set to an array of objects containing the name of the filter and the option itself, like this => `[{filterName: nameOfFilter, option: nameOfOption},...,{filterName: nameOfFilter, option: nameOfOption}]`

### 2.2.0

- Feature:
  - Allow the "more content" column (the rightmost column where users can either open a modal or be redirected to a URL) to be disabled
  - Implemented via a key in the existing `options` prop: `hideMoreContentColumn`, which can be set to true to remove the column entirely
  - Provide example usage comment in Serve.vue

### 2.1.2

- Chore: run build and build-lib, update version in package.json

### 2.1.1

- Chore: run build and build-lib, update version in package.json

### 2.1.0

- Fix: Use getters in TableHeading and TableFilter components to properly read the state of the store
- Feat: Allow customisable link icons using slots and portals

### 2.0.1

- Fix: Switch order of merged options to ensure options entered via prop take precedence

### 2.0.0

- Fix: fix item.value not displayed due to legend_on not having v-else.
- Breaking change:
  - $root.$on.openModal no longer emits tableId
  - $root.$on.openModal emits an object with { row, rowIndex, tableId, tableColumns }
  - Extract { tableId } in listeners of openModel to fix.

### 1.2.1

- Hotfix: Correct broken import

### 1.2.0

- Feature:
  - Modify FilterableTable component so that it stores and allows control over which of the table's columns are sorted, and in which direction
  - Add the column sort to the data sent by the component to the back-end
- Bugfix:
  - Use Vue.set in store when creating a new table to ensure reactivity
- Formatting:
  - Enforce newline between computed properties, methods and props
  - Enforce newline between sibling elements in markdown
  - Enforce whitespace between `if` and `()`
- Refactoring: 
  - Use `mapGetters`, `mapState` & `mapActions` and `createNamespacedHelpers` instead of `this.$store.getters[]`
  - Use `const` for mutable object assignments
  - Use `v-text` instead of `{{}}` wherever possible
  - Remove unnecessary parentheses in `@` event handlers
  - Prefer `===` to `==`
  - Further general optimisations

### 1.1.0

- new legend components
- small style fixes
- default config update
### 1.0.5

- CSS and JavaScript Fixes for IE11
- Add option to change colour of the arrow in the "view more" button
### 1.0.4

- Publish build files!

### 1.0.3

- Make strings with 'http' in them into hyperlinks

### 1.0.2

- Fix the CSV Download
### 1.0.1

- 

### 1.0.0

Initial version of the component library to test it works with npm.