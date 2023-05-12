import React, { FC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));
// 이렇게 import를 하게 되면 다른 컴폰넌트들은 동적으로 import 된다
// 즉 해당 컴포넌트를 불러질 때 파일을 읽어들인다.
// 이는 파일에 접근하는 순간 속도가 느려질 수 있고 초기 속도를 개선하기 위함으로 사용 된다.
const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
