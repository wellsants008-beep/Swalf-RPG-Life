import { ATTRIBUTE_META, AttributeKey } from "@/lib/game";

export function AttributeBar({ attr, value }: { attr: AttributeKey; value: number }) {
  const meta = ATTRIBUTE_META[attr];
  const max = Math.max(100, Math.ceil((value + 1) / 100) * 100);
  const pct = (value / max) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          <span className="mr-1.5">{meta.emoji}</span>{meta.label}
        </span>
        <span className="text-muted-foreground">{value} / {max}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: meta.color }}
        />
      </div>
    </div>
  );
}
