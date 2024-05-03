import { Dispatch, SetStateAction, createContext } from 'react';

interface IListContext {
    listData: any[];
    setListData: Dispatch<SetStateAction<any[]>>;
  }

export const Context = createContext<IListContext>({
    listData: [],
    setListData: () => {},
  });