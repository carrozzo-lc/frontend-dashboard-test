import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { MRT_RowData } from 'material-react-table';

// ----------------------------------------------------------------------

interface BaseTableProps<TData extends MRT_RowData> {
  data: TData[];
  loading?: boolean;
  columns: MRT_ColumnDef<TData>[];
}

const BaseTable = <TData extends MRT_RowData>({
  data = [],
  columns,
  loading,
}: BaseTableProps<TData>) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    state: {
      isLoading: loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default BaseTable;
