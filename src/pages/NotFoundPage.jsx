import { Link } from "react-router";

export const NotFoundPage = () => {
  return <div className="flex items-center flex-col mt-30 gap-10">
    <h1 className=""> Sorry, this page is not found.</h1>
    <Link to={"/"} className="text-white text-xl underline">Go back Home</Link>
  </div>;
};
