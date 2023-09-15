import type { HeadingAttributes } from '@/types/FilterableTable/configTypes'
import type { LinkType, RecordId } from '@/types/FilterableTable/dataTypes'

export type InternalLinkInfo = {
  attribute: HeadingAttributes
  routeInfo: LinkType
}

export type archiveRestoreCurrentRowInfo = {
  trueArchiveAndFalseRestore: boolean
  recordId: RecordId
}
