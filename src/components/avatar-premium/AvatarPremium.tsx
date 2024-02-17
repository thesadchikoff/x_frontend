import Avatar from "react-avatar";
import styles from "./AvatarPremium.module.scss";

interface AvatarPremiumProps {
  user: User | null;
}

export const AvatarPremium = ({ user }: AvatarPremiumProps) => {
  return (
    <>
      {user?.is_premium ? (
        <div className={styles.root_avatar}>
          <div className={styles.premium_indicator}>
            <Avatar
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore

              name={user?.login ? user?.login : user?.email}
              size="50"
              email={user?.email}
              round
              src={import.meta.env.VITE_API_URL + "/" + user?.avatar_url}
              className={styles.avatar}
            />
          </div>
        </div>
      ) : (
        <Avatar
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          name={user?.login ? user?.login : user?.email}
          size="50"
          email={user?.email}
          round
          src={import.meta.env.VITE_API_URL + "/" + user?.avatar_url}
          className={styles.avatar}
        />
      )}
    </>
  );
};
