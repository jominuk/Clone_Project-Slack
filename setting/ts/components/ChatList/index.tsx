import React, { useCallback, forwardRef, MutableRefObject, useRef } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { IDM, IChat } from '@typings/types';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, ref) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      setSize((prevSize) => prevSize + 1).then(() => {
        //스크롤 위치 유지
        const current = (ref as MutableRefObject<Scrollbars>)?.current;
        if (current) {
          current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          console.log(current?.getScrollHeight(), values.scrollHeight);
          // 콘솔에 입력되는 숫자에서 앞쪽에는 전체 높이를 나타내주고 있고
          // 또한 데이터를 더 가져온다면 총 높이를 추가로 더해서 나타내줌
          // 두 쪽 숫자는 현재 스크롤바의 위치를 나태내 주고 있음
        }
      });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;
