import React from 'react';
import { Table } from 'antd';
import { TableProps } from './interface';
import styles from './styles.scss';

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default TableComponent;