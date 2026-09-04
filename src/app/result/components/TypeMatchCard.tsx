import { Badge } from "@/components/badge/Badge";
import { Tag } from "@/components/tag/Tag";
import { CharacterAvatar } from "./CharacterAvatar";
import { KEY_TO_THEME, TYPE_TAGS, type TypeKey } from "../theme";

export function TypeMatchCard({
  label,
  typeKey,
  name,
}: {
  label: string;
  typeKey: TypeKey;
  name: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center rounded-2xl bg-white px-4 py-4">
      <p className="text-subtitle1 text-warm-gray-60 text-center">{label}</p>
      <div className="mt-3">
        <CharacterAvatar typeKey={typeKey} size={100} />
      </div>
      <div className="mt-2 flex flex-col items-center gap-3">
        <Badge color={KEY_TO_THEME[typeKey]}>{name}</Badge>
        <div className="flex flex-col items-center gap-1.5">
          {TYPE_TAGS[typeKey].map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
