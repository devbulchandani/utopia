import React from 'react';
import { format } from 'date-fns';
import { Attendee } from '../../types/event';
import { Table } from '../ui/Table';

interface AttendeeTableProps {
  attendees: Attendee[];
}

export const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (_: any, attendee: Attendee) => `${attendee.firstName} ${attendee.lastName}`,
    },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Registration Date',
      accessor: 'registrationDate',
      cell: (value: string) => (value ? format(new Date(value), 'PPP') : 'N/A'),
    },
    { header: 'Wallet Address', accessor: 'walletAddress' },
  ];

  return (
    <div className="mt-4">
      <Table data={attendees} columns={columns} emptyMessage="No users registered yet" />
    </div>
  );
};
