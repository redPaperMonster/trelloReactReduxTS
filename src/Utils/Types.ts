export type ColumnType = {
    id: string,
    title: string,
    description: string
}
export type ColumnDataType = {
    data: Array<ColumnType>
}

export type CardType = {
    id: string,
    columnId: string,
    title: string,
    description: string
}

export type CardDataType = {
    data: Array<CardType>
}

export type CommentType = {
    id: string,
    cardId: string,
    text: string,
    author: string
}

export type CommentDataType = {
    data: Array<CommentType>
}
