import type { User } from '@/interfaces/user'

export type Song = {
  _id: string
  videoId: string
  title: string
  createdAt: number
  addedBy: string | User
  thumbnail: string
  status: 'playing' | 'played' | 'pending'
  upVotes: number
  downVotes: number
  userUpVoted: boolean
  userDownVoted: boolean
}

export type CreateSongPayload = Pick<
  Song,
  '_id' | 'title' | 'thumbnail' | 'addedBy'
>
