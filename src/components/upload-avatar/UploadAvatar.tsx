import { useUploadUserAvatar } from "@/hooks/queries/useUploadUserAvatar";
import { useRef, useState } from "react";
import Avatar from "react-avatar";
import Button from "../button/Button";

export const UploadAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null); // Уточнил тип данных
  const { mutate } = useUploadUserAvatar();

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
        alert("Пожалуйста, выберите изображение в форматах PNG, JPG или JPEG.");
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
        <div className="flex items-center gap-5">
          <Avatar src={previewUrl} round />
          <div className="flex flex-col justify-between gap-5">
            <span className="p-3 border rounded-xl ">
              {fileName && fileName}
            </span>
            <div className="flex items-center gap-3">
              <Button title="Загрузить" onClick={loadAvatar} />
              <Button title="Отмена" variant="ghost" onClick={cancelUpload} />
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
