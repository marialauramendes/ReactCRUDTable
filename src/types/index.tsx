import { ReactElement } from 'react';
import type { ButtonProps } from 'antd/es/button';

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
  edit?:  ReactElement<ButtonProps>
}
export type TheadType = {
  key: string;
  dataIndex: string;
  title: string;
}