import Status from "@/assets/status.gif";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./ContextStatus.module.scss";
import { useStatusPackQuery } from "@/hooks/queries/useStatusPackQuery";
import { useIconsQuery } from "@/hooks/queries/useIconQuery";
import { usePatchIcon } from "@/hooks/queries/usePatchIcon";

export const ContextStatus = () => {
  const containerRef = useRef(null);
  const { data, isLoading, isError, isSuccess } = useStatusPackQuery();

  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const scrollAmount = 50;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    container.scrollLeft += event.deltaY > 0 ? scrollAmount : -scrollAmount;
  };

  const [activePackId, setActivePackId] = useState<string | null>(null);

  const GetContent = (params: { params: string }) => {
    const { data, isError, isFetching, isSuccess, error } =
      useIconsQuery(params);
    const { mutate } = usePatchIcon();
    if (isFetching) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="animate-spin" />
        </div>
      );
    }
    if (isError) {
      console.log(error);
      return (
        <div className="flex items-center justify-center w-full h-full">
          <span>Ошибка загрузки иконок [{error.message}]</span>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <>
          {data.map((icon) => {
            return (
              <img
                onClick={() => mutate(icon.id)}
                key={icon.id}
                src={import.meta.env.VITE_API_URL + "/" + icon.path}
                alt=""
                className="cursor-pointer w-[40px] h-[40px] object-contain"
              />
            );
          })}
        </>
      );
    }
  };

  const GetPack = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full">
          <Loader2 className="animate-spin opacity-60" />
        </div>
      );
    }
    if (isError) {
      return (
        <span className="flex items-center justify-center w-full text-xs !opacity-50">
          Ошибка загрузки набора
        </span>
      );
    }
    if (isSuccess) {
      return (
        <div className="box-border flex items-center gap-3 px-5">
          {data.map((pack) => {
            return (
              <img
                onClick={() => {
                  setActivePackId(pack.id);
                }}
                key={pack.id}
                className="rounded-full cursor-pointer"
                src={import.meta.env.VITE_API_URL + "/" + pack.preview}
                alt={pack.name}
                title={pack.name}
                width={24}
                height={24}
              />
            );
          })}
        </div>
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setActivePackId(data[0].id);
    }
  }, [isSuccess, data]);
  return (
    <div className={styles.status_context_menu} onWheel={handleWheelScroll}>
      {/* <header className={styles.header}>
				<span className={styles.title}>Выберите статус</span>
			</header> */}
      <div className={styles.body} key={24}>
        <GetContent params={activePackId} />
      </div>
      <div
        onWheel={handleWheelScroll}
        className={styles.footer}
        ref={containerRef}
      >
        <GetPack />
      </div>
    </div>
  );
};
