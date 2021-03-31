import { createSelector } from 'reselect'
import { RootState, CardType, CommentType, ColumnType } from '.';

const store = (state: RootState) => state;

export const stateSelectors = {
    getUserName: () => createSelector(
        store,
        state => state.userName.name),

    getCols: () => createSelector(
        store,
        state => state.columns.data),

    getCards: (id: string) => createSelector(
        store,
        (state) => state.cards.data.filter((i: CardType) => i.columnId === id)),

    getComms: (id: string) => createSelector(
        store,
        (state) => state.comments.data.filter((i: CommentType) => i.cardId === id)),

    getColumnTitle: (id: string) => createSelector(
        store,
        (state) => {
            const selectedColumns = state.columns.data.filter((i: ColumnType) => i.id === id)
            return selectedColumns ? selectedColumns[0].title : " ";
        }
    )

}