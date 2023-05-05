import { IDM, IChat } from '@typings/db';
import React, { VFC, memo, useMemo } from 'react';
import gravatar from 'gravatar';
import { ChatWrapper } from './styles';

interface Props {
  data: IDM | IChat;
}

const Chat: VFC<Props> = ({ data }) => {
  const user = 'Sender' in data ? data.Sender : data.User;

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{data.createdAt}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
