import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

interface Link {
  title: string;
  path: string;
  icon: JSX.Element<LucideIcon | ReactElement>;
}
