import Community from "@/assets/community.png";
import styles from "./CommunityScreen.module.scss";
import Button from "@/components/button/Button";
export const CommunityScreen = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center w-full select-none">
        <img src={Community} alt="" width={700} height={700} />
      </div>
      <div className="flex flex-col items-center justify-between h-full gap-5">
        <h1 className={styles.title}>
          Сообщество - это энергичные команды людей, объединенные общей целью и
          стремлением к совместному достижению результатов!
        </h1>
        <Button title="Найти своё" variant="ghost" />
      </div>
    </div>
  );
};
