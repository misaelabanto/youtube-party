export type Song = {
  id: string
  title: string
  addedAt: number
  upVotes: number
  downVotes: number
  addedBy: number
  thumbnail: string
}

export type CreateSongPayload = Pick<
  Song,
  'id' | 'title' | 'thumbnail' | 'addedBy'
>
