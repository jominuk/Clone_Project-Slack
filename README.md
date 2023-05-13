백엔드 [여기](https://github.com/ZeroCho/sleact/blob/master/nest-typeorm/README.md)

실행하기

1. back에 .env 를 만들고

```
COOKIE_SECRET=cookienyamnyam
MYSQL_PASSWORD=디비비번
```

이렇게 세팅

1. 터미널 cd back => npm run dev
2. 새로운 터미널 창 cd setting => cd ts => npm run dev

# 백그라운드 세팅

0. [node 16](https://nodejs.org)버전(14나 17도 괜찮음)과 [MySQL](https://dev.mysql.com/downloads/mysql/)을 미리 설치하기, mysql은 설치과정 중 비번 설정 함.
1. 이 레포 git clone 받기
2. cd back
3. npm i bcrypt && npm i
4. .env 작성하기(COOKIE_SECRET과 MYSQL_PASSWORD 비밀번호 설정)

```
COOKIE_SECRET=cookienyamnyam
MYSQL_PASSWORD=디비비번
```

5. config/config.json 설정(MYSQL 접속 설정)
6. npx sequelize db:create(스키마 생성)
7. npm run dev했다가 ctrl + c로 끄기(테이블 생성)
8. npx sequelize db:seed:all(기초 데이터 넣기)
9. npm run dev(앞으로 매번 이걸로 백엔드 서버 켜야 함, 1~8은 할 필요 없음)
10. localhost:3095에서 서버 돌아가는 중
11. 백엔드 개발자가 API.md와 typings/db.ts를 남겨둔 상황

## 시작

12. 회원가입 axios로 진행

- npm i axios
- CORS 문제를 피하기 위해서 devServer에 proxy 세팅
- CORS는 브라우저에서 다른 도메인의 서버로 요청을 보낼 때 발생
- 같은 도메인의 서버로 요청을 보내거나, 서버끼리 요청을 보낼 때는 발생하지 않음
- 따라서 같은 도메인인 proxy서버를 띄워 CORS를 피해갈 수 있음.

13. useInput 커스텀 훅 만들기

- 커스텀 훅으로 훅들간에 중복된 것을 제거할 수 있음
- 훅 내부에 훅을 작성할 수 있는 유일한 케이스
- useCallback은 return 안에 들어있는 함수에 꼭 적용해주자
- useMemo는 return 안에 들어있는 값에 적용하자

14. @pages/LogIn 작성 및 SWR

- 로그인 한 사람이 회원가입/로그인 페이지에 접근한다면?
- GET 요청은 SWR로 하는 것도 괜찮음
- npm i swr
- SWR에 fetcher(axios를 사용)를 달아줌.
- 로그인했음을 증명하기 위해 withCredentials: true 잊으면 안 됨.

15. @layouts/Workspace 작성

- 눈에 띄는 구역 단위로 스타일드컴포넌트로 만들어둠.
- 구역 내부의 태그들은 스타일드컴포넌트로 만들면 변수명 지어야 하니 css선택자로 선택

16. 그라바타

- npm i gravatar @types/gravatar
- Github같은 아이콘을 만들 수 있음

17. typescript 정의

- 기본적으로 변수, 매개변수, 리턴값에 타입을 붙여주면 됨.
- 남이 타이핑해둔 것 분석하는 게 어려움
- Go to Type Definition
- 자바스크립트 라이브러리 작성자와는 다른 사람이 만든 ts 라이브러리가 @types로 시작하는 것들

18. @components/DMList 작성

- 현재 채널 참여자 목록 가져오기

19. @pages/DirectMessage 작성

- Header와 ChatList, ChatBox로 구성

20. @components/ChatBox 먼저 작성

- react-mentions 활용
- DM에서는 멘션 기능이 없지만 Channel에서는 있을 것

21. DM 보내보기

- optimistic UI
- 먼저 프론트에서 표시하고, 서버로는 그 다음에 요청보냄
- 요청 실패하는 순간 프론트에서 제거하고 에러 메시지 띄움
- 보낼 때 에러가난 것은 서버쪽에서 socket 연결 여부를 확인하기 때문

22. DM 로딩은 useSWRInfinite 사용

- 결과물이 2차원 배열 꼴로 나옴.
- 첫 번째 인자가 주소 문자열이 아닌 주소를 리턴하는 함수
- 이 함수의 매개변수로 페이지가 들어있어서 현재 몇 페이지인지 알 수 있음.

23. Workspace에 소켓 연결하기

- socket.emit이 클라이언트에서 서버로, socket.on이 서버에서 클라이언트로

24. DMList에 onlineList, dm 이벤트 연결
25. @components/ChatList 작성 및 @components/Chat 구현

- npm i react-custom-scrollbars @types/react-custom-scrollbars

26. makeSection 구현

- npm i dayjs
- dayjs는 moment를 대체함

27. 프로파일링 하면서 Chat에 memo 적용하기
28. 인피니트 스크롤링 구현
29. @components/ChannelList 작성
30. @pages/ChannelMessage 작성
31. Channel Chat 보내보기
32. 빌드 설정
33. 빌드 결과물인 JS와 html을 서버개발자에게 전달하기
