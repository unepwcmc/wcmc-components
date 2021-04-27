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
| `optionsMerged` | `object`  |             | `{}`          |
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