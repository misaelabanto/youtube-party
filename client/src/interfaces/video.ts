export interface Video {
  kind: string
  etag: string
  id: {
    kind: string
    videoId?: string
    channelId?: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
  }
}

interface Thumbnail {
  url: string
  width: number
  height: number
}
