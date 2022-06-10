### 2.0.1

- Fix: Use getters in TableHeading and TableFilter components to properly read the state of the store
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
