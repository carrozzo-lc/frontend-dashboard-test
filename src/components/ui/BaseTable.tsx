import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { MRT_RowData } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

interface BaseTableProps<TData extends MRT_RowData> {
  data: TData[];
  loading?: boolean;
  onEditRow: (id: number) => void;
  onDeleteRow: (id: number) => void;
  columns: MRT_ColumnDef<TData>[];
}

const BaseTable = <TData extends MRT_RowData>({
  data = [],
  columns,
  loading,
  onEditRow,
  onDeleteRow,
}: BaseTableProps<TData>) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    state: {
      isLoading: loading,
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={() => onEditRow(row.original.id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDeleteRow(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default BaseTable;
