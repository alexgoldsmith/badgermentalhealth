export interface Post {
    _id: Number,
    Title: String, 
    Author: String, 
    Text: String, 
    Date: Date, 
    Likes: number, 
    NumReplies: Number,
}

export interface Quiz {
	title: string,
	description: string,
	questions: string[],
	minPerQuestion: number,
	maxPerQuestion: number,
	answerLegend: string[],
}

export interface Replies {
    Text: String, 
    Author: String, 
    PostId: Number,
    Date: String, 
    Likes: Number,
}