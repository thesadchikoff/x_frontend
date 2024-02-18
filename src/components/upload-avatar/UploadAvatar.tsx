import { useUploadUserAvatar } from "@/hooks/queries/useUploadUserAvatar";
import { useRef, useState } from "react";
import Avatar from "react-avatar";
import Button from "../button/Button";
import { toast } from "sonner";
import { useThemeContext } from "@/hooks/useThemeContext";
import { cn } from "@/utils/helpers";

export const UploadAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null); // Уточнил тип данных
  const { mutate } = useUploadUserAvatar();
  const { theme } = useThemeContext();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      if (/\.(jpg|jpeg|png)$/.test(fileName)) {
        const fileData = new FormData();
        fileData.append("avatar", file);
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
        setFileName(fileName);
        setFile(fileData);
      } else {
        toast.warning(
          "Пожалуйста, выберите изображение в форматах PNG, JPG или JPEG."
        );
        // Сбросить значение инпута
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const loadAvatar = () => {
    if (file) {
      mutate(file);
    }
    setPreviewUrl(null);
    setFileName("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cancelUpload = () => {
    setPreviewUrl(null);
    setFileName("");
    setFile(null);
    // Сбросить значение инпута
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        className="hidden"
        accept=".jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <div className="flex items-center gap-5 mobile:flex-col desktop:flex-row">
          <Avatar
            src={previewUrl}
            round
            className="object-cover w-[100rem] h-[100rem]"
          />
          <div className="flex flex-col justify-between gap-5">
            <span
              className={cn(
                "py-[0.5rem] px-[1rem] border rounded-xl",
                "mobile:text-xs",
                "tablet:text-lg",
                {
                  "border-dark": theme === "dark",
                }
              )}
            >
              {fileName && fileName}
            </span>
            <div className="flex items-center justify-between w-full gap-3">
              <Button fullWidth title="Загрузить" onClick={loadAvatar} />
              <Button
                fullWidth
                title="Отмена"
                variant="ghost"
                onClick={cancelUpload}
              />
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleClick}
          title="Выбрать фото профиля"
          variant="ghost"
        />
      )}
    </div>
  );
};
