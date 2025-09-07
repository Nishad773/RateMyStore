import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";

interface StoreCardProps {
  id: string;
  name: string;
  address: string;
  avgRating?: number;
  ratingsCount?: number;
  canRate?: boolean;
  userId?: string;
}

export default function StoreCard(props: StoreCardProps) {
  const { id, name, address, avgRating = 0, ratingsCount = 0, canRate, userId } = props;
  const [value, setValue] = useState<number>(Math.round(avgRating));
  const [avg, setAvg] = useState<number>(avgRating);
  const [count, setCount] = useState<number>(ratingsCount);
  const submit = async () => {
    const res = await api.post(`/stores/${id}/rate`, { value, userId });
    setAvg(res.data.avg);
    setCount((c) => (c === 0 ? 1 : c));
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{address}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{avg.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">{count} ratings</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <StarRating value={value} onChange={setValue} readOnly={!canRate} />
        {canRate && (
          <Button onClick={submit} className="ml-3">Submit</Button>
        )}
      </div>
    </div>
  );
}
