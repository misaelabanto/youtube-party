import type { Vote } from '@/interfaces/vote'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'

const VOTES_URL = `${import.meta.env.VITE_API_URL}/votes`

export const useVoteStore = defineStore('vote', () => {
  const createVote = (vote: Vote) => useFetch(VOTES_URL).post(vote)
  return { createVote }
})
