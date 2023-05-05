import React, { VFC } from 'react';
import { ChatZone, Section } from './styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';

interface Props {
  chatData?: IDM[];
}

const ChatList: VFC<Props> = ({ chatData }) => {
  return (
    <ChatZone>
      {/* {Array?.isArray(chatData) && chatData?.map((chat) => <Chat key={chat.id} data={chat} />)} */}
      {chatData?.map((chat) => {
        <Chat key={chat.id} data={chat} />;
      })}
    </ChatZone>
  );
};

export default ChatList;
