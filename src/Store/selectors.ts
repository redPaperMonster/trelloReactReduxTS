import { createSelector } from 'reselect'
import { RootState } from '.';
import { CardType, ColumnType, CommentType } from '../Utils';

const store = (state: RootState) => state;

export const stateSelectors = {
    getUserName: () => createSelector(
        store,
        state => state.userName.name),

    getColumns: () => createSelector(
        store,
        state => state.columns.data),

    getCardsByColumnId: (id: string) => createSelector(
        store,
        (state) => state.cards.data.filter((i: CardType) => i.columnId === id)),

    getCommentsByCardId: (id: string) => createSelector(
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