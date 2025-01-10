import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarProfile = ({
  AvatarClass = "",
  ImgSrc = "",
  ImgAlt = "",
  fallback = "",
}) => {
  return (
    <Avatar className={AvatarClass}>
      <AvatarImage src={ImgSrc} alt={ImgAlt} />
      <AvatarFallback>
        {fallback
          .split(" ")
          .map((char: string) => char[0].toUpperCase())
          .join(" ")}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;
