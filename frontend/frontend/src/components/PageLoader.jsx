import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
    <LoaderIcon className="text-primary spinner-border" style={{ width: "2.5rem", height: "2.5rem" }} />
  </div>
);

};
export default PageLoader;