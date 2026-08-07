import Image from "next/image";
import { THEME_STYLES, type ResultData } from "../page";

export function CharacterAvatar({
  data,
  size,
  priority,
}: {
  data: ResultData;
  size: number;
  priority?: boolean;
}) {
  if (data.characterImage) {
    return (
      <Image
        src={encodeURI(data.characterImage)}
        alt={data.type}
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
      className={`shrink-0 rounded-full ${THEME_STYLES[data.themeColor].avatarBg}`}
    />
  );
}
