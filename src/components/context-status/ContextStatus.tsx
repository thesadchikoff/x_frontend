import { BookHeart } from "lucide-react";
import styles from "./ContextStatus.module.scss";
import Status from "@/assets/status.gif";

export const ContextStatus = () => {
  return (
    <div className={styles.status_context_menu}>
      <header className={styles.header}>
        <span className={styles.title}>Выберите статус</span>
      </header>
      <div className={styles.body}>
        {Array.from(Array(30)).map((item, index) => {
          return (
            <img
              key={String(index)}
              src={Status}
              alt=""
              width={20}
              height={30}
              className="rounded-full"
            />
          );
        })}
      </div>
      <div ref={scrollRef} className={styles.footer}>
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
        <BookHeart size={20} />
      </div>
    </div>
  );
};
