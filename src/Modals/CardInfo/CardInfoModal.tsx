import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
  CommentItem,
  InputField,
  InputFieldTheme,
} from '../../Components';
import { cardActions, commentActions, stateSelectors } from '../../Store';
import {
  CardModalDescription,
  CardRedactWrapper,
  CommentsWrapper,
  SendCommentWrapper,
} from './CardInfoStyle';
import { nanoid } from '@reduxjs/toolkit';
import { CardType, CommentType, fieldRequired } from '../../Utils';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  card: CardType;
  comments: Array<CommentType>;
}

interface Values {
  text: string;
}
interface CardValues {
  title: string;
  description: string;
}
const ModalCardInfo: React.FC<ModalProps> = ({
  isOpen,
  close,
  card,
  comments,
}) => {
  const [isRedacted, setIsRedacted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const userName = useSelector(stateSelectors.getUserName());

  const columnTitle = useSelector(stateSelectors.getColumnTitle(card.columnId));

  const addComment = (values: Values) => {
    const newComment = {
      id: nanoid(),
      cardId: card.id,
      text: values.text,
      author: userName,
    };
    dispatch(commentActions.addComment(newComment));
  };

  const handleUpdate = (values: CardValues) => {
    setIsRedacted(false);
    const newCard = {
      id: card.id,
      columnId: card.columnId,
      title: values.title,
      description: values.description,
    };
    dispatch(cardActions.updateCard(newCard));
  };

  const updateAction = (values: CardValues) => {
    isRedacted ? handleUpdate(values) : setIsRedacted(true);
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <CardRedactWrapper>
        <Form
          onSubmit={updateAction}
          initialValues={{ title: card.title, description: card.description }}
        >
          {({ handleSubmit }) => (
            <form>
              <label>card title</label>
              <Field
                name="title"
                customSize={20}
                disabled={!isRedacted}
                bgStyle={InputFieldTheme.modalBG}
                customTextAlign={InputFieldTheme.textAlignCenter}
                validate={fieldRequired}
                component={InputField}
              />

              <label>card description</label>
              <Field
                name="description"
                disabled={!isRedacted}
                bgStyle={InputFieldTheme.modalBG}
                customTextAlign={InputFieldTheme.textAlignCenter}
                customSize={20}
                component={InputField}
              />
              <Button onClick={handleSubmit} text={isRedacted ? '💾' : '✎'} />
            </form>
          )}
        </Form>
      </CardRedactWrapper>

      <CardModalDescription>
        Column: {columnTitle}, Author: {userName}
      </CardModalDescription>
      <CommentsWrapper>
        {comments.map((i: CommentType) => {
          return <CommentItem comment={i} key={i.id} />;
        })}
      </CommentsWrapper>
      <SendCommentWrapper>
        <Form
          onSubmit={addComment}
          render={({ handleSubmit, form }) => (
            <form>
              <Field
                name="text"
                validate={fieldRequired}
                component={InputField}
              />
              <Button
                customStyles="padding: 10px 5px; margin-left: 5px;"
                onClick={() => {
                  handleSubmit();
                  form.getFieldState('text')?.value && form.restart();
                }}
                text="save comment"
              />
            </form>
          )}
        />
      </SendCommentWrapper>
    </Modal>
  );
};

export default ModalCardInfo;
