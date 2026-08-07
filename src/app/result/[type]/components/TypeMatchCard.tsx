import { Badge } from "@/components/badge/Badge";
import { CharacterAvatar } from "./CharacterAvatar";
import type { ResultData } from "../page";

export function TypeMatchCard({
  label,
  data,
  badgeColor,
}: {
  label: string;
  data: ResultData;
  badgeColor: "orange" | "green";
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-white px-4 py-4">
      <p className="text-subtitle1 text-warm-gray-60 text-center">{label}</p>
      <CharacterAvatar data={data} size={100} />
      <Badge color={badgeColor}>{data.type}</Badge>
    </div>
  );
}
