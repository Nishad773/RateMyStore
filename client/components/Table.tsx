import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

interface Column<T> {
  key: keyof T;
  header: string;
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  filterPlaceholder?: string;
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  filterPlaceholder = "Search...",
}: TableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const base = q
      ? data.filter((row) =>
          Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
        )
      : data;
    if (!sortKey) return base;
    return [...base].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va === vb) return 0;
      return (va > vb ? 1 : -1) * (asc ? 1 : -1);
    });
  }, [query, data, sortKey, asc]);

  const onSort = (k: keyof T) => {
    if (sortKey === k) setAsc((x) => !x);
    else {
      setSortKey(k);
      setAsc(true);
    }
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder={filterPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="px-4 py-2 text-left font-medium cursor-pointer select-none"
                  onClick={() => onSort(c.key)}
                >
                  {c.header}
                  {sortKey === c.key && (
                    <span className="ml-1">{asc ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-4 py-2">
                    {String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
