import Avatar from "react-avatar";
import styles from "./AvatarPremium.module.scss";

interface AvatarPremiumProps {
  user: User;
}

export const AvatarPremium = ({ user }: AvatarPremiumProps) => {
  return (
    <div className={styles.root_avatar}>
      <div className={styles.premium_indicator}>
        <Avatar
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          name={user?.login ? user?.login : user?.email}
          size="50"
          email={user?.email}
          round
          src={user?.avatar_url}
          className={styles.avatar}
        />
      </div>
    </div>
  );
};
