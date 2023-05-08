import React, { useCallback, useRef } from 'react';
import gravatar from 'gravatar';
import { Container } from '@pages/Channel/styles';
import { Header } from './styles';
import useSWR, { useSWRInfinite } from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useinput';
import axios from 'axios';
import { IDM } from '@typings/db';
import ChatList from '@components/ChatList';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);

  const { data: myData } = useSWR('/api/users', fetcher);

  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  const isEmpty = chatData?.[0]?.length === 0;
  // 데이터가 비어있을 떄 나타내는 함수
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  // 예를 들어 데이터를 20개 씩 가져오다가 마지막 페이지에 5개 정도 가져왓을 떄 나타내는 함수

  const scrollbarRef = useRef<Scrollbars>(null);

  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log('chat');
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat],
  );

  if (!userData || !myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nicknam} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        ref={scrollbarRef}
        setSize={setSize}
        isEmpty={isEmpty}
        isReachingEnd={isReachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
