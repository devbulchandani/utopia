import React from 'react';
import { format } from 'date-fns';
import { Attendee } from '../../types/event';
import { Table } from '../ui/Table';

interface AttendeeTableProps {
  attendees: Attendee[];
}

export const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Registration Date', 
      accessor: 'registrationDate',
      cell: (value: Date) => format(new Date(value), 'PPP')
    },
    { header: 'Ticket Type', accessor: 'ticketType' }
  ];

  return (
    <div className="mt-4">
      <Table
        data={attendees}
        columns={columns}
        emptyMessage="No users registered yet"
      />
    </div>
  );
};