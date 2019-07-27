export interface Photo {
  id: number
  userId: number
  postDate: Date
  url: string
  description: string
  likes: number
  comments: number
  allowComments: boolean
}
