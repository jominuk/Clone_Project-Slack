import React, { useCallback, useState } from 'react';
import { Success, Error, Form, Label, Input, LinkContainer, Button, Header } from './styles';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useinput';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
  const { data } = useSWR('/api/users', fetcher);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        setSignUpError('');
        setSignUpSuccess(false);
        //비동기 요청에 단계에서 비동기 요청을 보내기 직전에 초기화를 한번씩 해주는게 좋다
        // 그 이유는 이전 단계의 자료가 남아있을 수 있기 때문이다.
        axios
          .post('/api/users', {
            //webpack.config.ts에 있는 proxy 설정을 프론트엔드에서 api주소 요청을 바꿔서 보낸다는 설정을 해둿음
            email,
            nickname,
            password,
          })
          .then((res) => {
            setSignUpSuccess(true);
          })
          .catch((err) => {
            setSignUpError(err.res.data);
          })
          .finally(() => {});
        //성공하던 실패하든 무조건 실행하고 싶을 때 finally를 사용
      }
      // 이것도 가능
      // try {} catch (err) {

      // } finally {

      // }
    },
    [email, nickname, password, passwordCheck],
  );

  if (data === undefined) {
    return <div> 로딩 중 </div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
