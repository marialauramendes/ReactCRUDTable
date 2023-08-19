import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';
import { PostType, TheadType } from '../../types'


type Props = {
  data?: PostType[],
  thead: TheadType[],
  onChange: TableProps<PostType> ['onChange'],
}


function TableWrapper({ data, thead, onChange }:Props) {
  return (
    <Table columns={thead} dataSource={data} onChange={onChange}  />
  )
} ;

export default TableWrapper;