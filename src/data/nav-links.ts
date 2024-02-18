import { Link } from "@/@types/links";
import { Home, NotebookPen, UsersRound } from "lucide-react";

export const navLinks: Link[] = [
  {
    title: "Главная",
    path: "/",
    icon: Home,
  },
  {
    title: "Мои задачи",
    path: "/tasks",
    icon: NotebookPen,
  },
  {
    title: "Сообщество",
    path: "/community",
    icon: UsersRound,
  },
];
