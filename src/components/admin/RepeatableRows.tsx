"use client";

type FieldDef = { name: string; label: string; placeholder?: string; multiline?: boolean };

type Props = {
  value: Record<string, string>[];
  onChange: (next: Record<string, string>[]) => void;
  fields: FieldDef[];
  addLabel: string;
};

export default function RepeatableRows({ value, onChange, fields, addLabel }: Props) {
  const updateRow = (index: number, field: string, val: string) => {
    const next = value.slice();
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  };

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addRow = () => {
    const blank = Object.fromEntries(fields.map((f) => [f.name, ""]));
    onChange([...value, blank]);
  };

  return (
    <div className="space-y-3">
      {value.map((row, index) => (
        <div key={index} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
            {fields.map((f) =>
              f.multiline ? (
                <textarea
                  key={f.name}
                  rows={2}
                  placeholder={f.placeholder || f.label}
                  value={row[f.name] ?? ""}
                  onChange={(e) => updateRow(index, f.name, e.target.value)}
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:col-span-2"
                />
              ) : (
                <input
                  key={f.name}
                  placeholder={f.placeholder || f.label}
                  value={row[f.name] ?? ""}
                  onChange={(e) => updateRow(index, f.name, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              )
            )}
          </div>
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-xs font-semibold text-slate-500 hover:border-accent hover:text-accent"
      >
        + {addLabel}
      </button>
    </div>
  );
}
