# TableFilterOption

## Props

| Name                  | Type      | Description |
| --------------------- | --------- | ----------- |
| `option` *required*   | `unknown` |             |
| `table-id` *required* | `Number`  | &nbsp;      |

## Data

| Name         | Type      | Description | Initial value |
| ------------ | --------- | ----------- | ------------- |
| `isSelected` | `boolean` |             | `false`       |

## Computed Properties

| Name           | Type      | Description                           |
| -------------- | --------- | ------------------------------------- |
| `cssVariables` | `object`  | **Dependencies:** `config`            |
| `config`       | `unknown` | **Dependencies:** `$store`, `tableId` |
| `labelClasses` | `array` or| **Dependencies:** `config`
|                |   `string`|          |
| `optionId`     | `string`  | **Dependencies:** `option`            |