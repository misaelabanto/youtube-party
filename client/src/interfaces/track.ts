interface ExternalUrls {
  spotify: string
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface Image {
  height: number
  url: string
  width: number
}

interface Album {
  album_type: string
  artists: Artist[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_playable: boolean
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

interface ExternalIds {
  isrc: string
}

export interface Track {
  album: Album
  artists: Artist[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}