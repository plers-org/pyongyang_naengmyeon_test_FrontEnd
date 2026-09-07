import Image from "next/image";
import { CHARACTER_IMAGE, TYPE_LABEL, type TypeKey } from "../theme";

export function CharacterAvatar({
  typeKey,
  size,
  priority,
}: {
  typeKey: TypeKey;
  size: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={encodeURI(CHARACTER_IMAGE[typeKey])}
      alt={`${TYPE_LABEL[typeKey]} 캐릭터`}
      width={size}
      height={size}
      priority={priority}
      className="shrink-0"
    />
  );
}
