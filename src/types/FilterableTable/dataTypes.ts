export type RecordId = string | number

export type LinkType =
  | {
      type: 'internal'
      link?: null
      routeInfo: { [key: string]: string | number }
      title: string
    }
  | {
      type: 'external'
      routeInfo?: null
      link: string
      title: string
    }
export interface TableDataType {
  archived: boolean
  id: RecordId
  data: { [key: string]: string | number | string[] | number[] | LinkType[] }
}
