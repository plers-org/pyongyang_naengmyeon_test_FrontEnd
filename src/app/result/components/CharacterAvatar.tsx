import Image from "next/image";
import {
  CHARACTER_IMAGE,
  KEY_TO_THEME,
  THEME_STYLES,
  type TypeKey,
} from "../theme";

export function CharacterAvatar({
  typeKey,
  size,
  priority,
}: {
  typeKey: TypeKey;
  size: number;
  priority?: boolean;
}) {
  const src = CHARACTER_IMAGE[typeKey];
  if (src) {
    return (
      <Image
        src={encodeURI(src)}
        alt={typeKey}
        width={size}
        height={size}
        priority={priority}
        className="shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full ${THEME_STYLES[KEY_TO_THEME[typeKey]].avatarBg}`}
    />
  );
}
