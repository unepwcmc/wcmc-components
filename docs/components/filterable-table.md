---
sidebar: auto
---

# FilterableTable

## Props

| Name                | Type     | Description |
| ------------------- | -------- | ----------- |
| `attributes`        | `Array`  |             |
| `endpoint`          | `String` |             |
| `endpoint-download` | `String` |             |
| `filter-array`      | `Array`  |             |
| `options`           | `Object` | &nbsp;      |

### Options

| Name                    | Type      | Description |
| ----------------------- | --------- | ----------- |
| `columns`               | `Array`   | Array of column widths passed to css. Must equal the number of displayed columns. |
| `showArchived`          | `Boolean` | Configures whether the archive button is displayed. Default is false. |
| `showEdit`              | `Boolean` | Configures whether the edit button is displayed. Default is false. |
| `hideMoreContentColumn` | `Boolean` | Configures whether the more content column/button is displayed. Default is false. |
| `more...`               | `type`    | Continue to add to this...     |

## Data

| Name            | Type      | Description | Initial value |
| --------------- | --------- | ----------- | ------------- |
| `headings`      | `array`   |             | `[]`          |
| `currentPage`   | `number`  |             | `1`           |
| `dummyData`     | `unknown` |             | `DUMMY_DATA`  |
| `filters`       | `array`   |             | `[]`          |
| `id`            | `string`  |             | `""`          |
| `items`         | `array`   |             | `[]`          |
| `itemsPerPage`  | `number`  |             | `2`           |
| `totalItems`    | `number`  |             | `5`           |
| `totalPages`    | `number`  |             | `3`           |

## Computed Properties

| Name                    | Type      | Description                      |
| ----------------------- | --------- | -------------------------------- |
| `cssVariables`          | `object`  | **Dependencies:** `config`       |
| `config`                | `unknown` | **Dependencies:** `$store`, `id` |
| `requestedPage`         | `unknown` | **Dependencies:** `$store`, `id` |
| `selectedFilterOptions` | `unknown` | **Dependencies:** `$store`, `id` |

## Methods

### createSelectedFilterOptions()

**Syntax**

```typescript
createSelectedFilterOptions(): void
```

### getNewItems()

**Syntax**

```typescript
getNewItems(): void
```

### importUserOptions()

**Syntax**

```typescript
importUserOptions(): void
```

### updateProperties()

**Syntax**

```typescript
updateProperties(data: unknown): void