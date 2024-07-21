import React, { FC } from "react";
import ButtonPrimary, {
  ButtonPrimaryProps,
} from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface FollowButtonProps extends ButtonPrimaryProps {
  isFollowing?: boolean;
}

const FollowButton: FC<FollowButtonProps> = ({
  className = "relative z-10",
  sizeClass = "px-4 py-1.5 min-w-[84px]",
  fontSize = "text-sm font-medium",
  isFollowing = Math.random() > 0.5,
}) => {
  const [following, setFollowing] = React.useState(isFollowing);

  return !following ? (
    <ButtonPrimary
      className={className}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => setFollowing(true)}
    >
      Follow
    </ButtonPrimary>
  ) : (
    <ButtonSecondary
      className={` border border-slate-100 dark:border-slate-700 shadow-lg ${className}`}
      sizeClass={sizeClass}
      fontSize={fontSize}
      onClick={() => setFollowing(false)}
    >
      <span className="text-sm ">Following</span>
    </ButtonSecondary>
  );
};

export default FollowButton;
