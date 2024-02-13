import ContentLoader from "react-content-loader";
interface ImageLoaderProps {}
export const ImageLoader = (props: ImageLoaderProps) => {
  return (
    <ContentLoader
      width={500}
      height={500}
      viewBox="0 0 500 100"
      backgroundColor="#d13333"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="46" cy="38" r="38" />
    </ContentLoader>
  );
};
