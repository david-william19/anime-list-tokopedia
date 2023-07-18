import { TMedia } from "./media"
import { TPageInfo } from "./pageInfo"

export type TData = {
    Page: {
        pageInfo: TPageInfo
        media: TMedia[]
    }
  }