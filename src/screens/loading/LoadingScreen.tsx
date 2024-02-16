import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-primary-50">
      <Loader2 className="animate-spin" size={25} color="blue" />
    </div>
  );
};
