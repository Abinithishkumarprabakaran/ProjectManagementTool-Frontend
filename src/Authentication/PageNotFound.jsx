import { useParams } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="notfound-page">
      <h1>Page Not Found</h1>
      <img src="https://miro.medium.com/v2/resize:fit:1400/1*zE2qnVTJehut7B8P2aMn3A.gif" alt="404 Not Found" />
    </div>
  );
}
