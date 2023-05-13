import io, { Socket } from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: Socket } = {};
const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  console.log('rerender', workspace);
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;

// const sockets: { [key: string]: Socket } = {};

// const useSocket = (workspace?: string) => {
//   const sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`)
// 8. 뒤쪽 $ 를 추가로 주소를 넣어준다.
//   const  const sockets[workspace] = io.connect(`${backUrl}`)
// 6. 하지만 이렇게 서버에 연결을 하게 된다면 모든 사람과 소통을 하는 문제가 생김
// 7. 범위를 조정해줘야함
//   const sockets[workspace].emit('hello','world')
// 1. 서버쪽에 hello라는 이름으로 world라는 data를 보낸다
//   const sockets[workspace].on('message', (data) => {
//     console.log(data)
//   })  2. 서버쪽에서 데이터가 오면 message라는 이벤트 이름에다가 data라는 함수
//       3. emit으로 보내고 on으로 받고
//       4. 아래처럼 다양하게 백에서 다양하게 줄 수도 있음
//   const sockets[workspace].on('data', (data) => {
//     console.log(data)
//   })
//   const sockets[workspace].on('onlineList', (data) => {
//     console.log(data)
//   })
//   const disconnect = sockets[workspace].disconnect()
// 5. 한번 맺었던 연결을 끊는 함수
//   return
// }

// disconnect를 사용하지 않는다면
// 예를 들어 1번 스페이스에서 놀다가 2번 스페이스로 방을 옮긴 뒤 2번에서 대화를 하게 된다면 1번도 같은 대화를 유지하고 있는 현상이 생김
// 그래서 연결을 끊는disconnect를 꼭 사용해야함
