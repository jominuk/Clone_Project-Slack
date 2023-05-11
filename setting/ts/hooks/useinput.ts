import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  // 매개변수는 추론이 불가능해 type을 지정하고 그 뒤에 있는 return 값에도 type을 지정함
  // T의미는 제너릭이라는 변수를 만든다. 의미로 any와 같은 의미이다.
  // any로 해서 안좋은 점이 initialDate의 타입이 string라면 initialData 바로 뒤에 있는 T가 자동으로 string로 바뀌지 않는다.
  const [value, setValue] = useState(initialData);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
