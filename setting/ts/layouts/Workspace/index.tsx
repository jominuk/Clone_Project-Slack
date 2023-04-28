import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect } from 'react-router';
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper,
  Workspaces,
} from './styles';

const Workspace: FC = ({ children }) => {
  const { data, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro ' })} alt={data.nickname} />
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces> test </Workspaces>
        <Channels>
          <WorkspaceName> sleact </WorkspaceName>
          <MenuScroll> menuscroll </MenuScroll>
        </Channels>
        <Chats>chats</Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
