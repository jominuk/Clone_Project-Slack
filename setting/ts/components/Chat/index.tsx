import { IDM, IChat } from '@typings/types';
import React, { VFC, memo } from 'react';
import gravatar from 'gravatar';
import { ChatWrapper } from './styles';
import dayjs from 'dayjs';

interface Props {
  data: IDM | IChat;
}

const Chat: VFC<Props> = memo(({ data }) => {

  const user = 'Sender' in data ? data.Sender : data.User;

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
