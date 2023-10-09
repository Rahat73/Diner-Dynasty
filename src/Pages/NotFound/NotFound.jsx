import notfoundGIF from "../../assets/404.gif";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={notfoundGIF} alt="" />
    </div>
  );
};

export default NotFound;
