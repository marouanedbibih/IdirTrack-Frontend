// @ts-nocheck
"use client";
import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { TableData } from './TableData';
import { TableActions } from './TableActions';

interface TableProps {
  headers: string[];
  rows: TableData[];
  actions?: TableActions;
}

export function DefaultTable({ headers, rows, actions }: TableProps) {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
            <th
              key="actions"
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Actions
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
            return (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header} className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row[header]}
                    </Typography>
                  </td>
                ))}
                <td className={classes}>
                  {actions && (
                    <div className="flex space-x-2">
                      {actions.onEdit && (
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => actions.onEdit!(row)}
                        >
                          Edit
                        </Typography>
                      )}
                      {actions.onDelete && (
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => actions.onDelete!(row)}
                        >
                          Delete
                        </Typography>
                      )}
                      {actions.onView && (
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => actions.onView!(row)}
                        >
                          View
                        </Typography>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
