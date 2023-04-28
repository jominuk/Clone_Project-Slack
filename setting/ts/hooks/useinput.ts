import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnType<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnType<T> => {
  // 매개변수는 추론이 불가능해 type을 지정하고 그 뒤에 있는 return 값에도 type을 지정함
  // T의미는 제너릭이라는 변수를 만든다. 의미로 any와 같은 의미이다.
  // any로 해서 안좋은 점이 initialDate의 타입이 string라면 바로 뒤에 있는 T가 자동으로 string로 바뀌지 않는다.
  // 커스텀 훅 : 7:39초에서 확인
  // T는 value와 같고, (e: any) => void 는 handler, Dispatch<SetStateAction<T>> 는 setValue 와 같은 의미이다.
  const [value, setValue] = useState(initialData);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
//매개변수에는 추론이 불가능해서 type을 선언해야한다.
