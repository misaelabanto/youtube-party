export type Song = {
  id: string
  title: string
  createdAt: number
  addedBy: number
  thumbnail: string
}

export type CreateSongPayload = Pick<
  Song,
  'id' | 'title' | 'thumbnail' | 'addedBy'
>
