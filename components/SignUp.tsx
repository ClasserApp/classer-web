import SplitForm from "./SplitForm";

const SignUp = () => {
  return (
    <div className="flex flex-1 h-screen">
      <div
        className="flex-1 flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/wallpaper.jpeg')" }}
      ></div>
      <div className="flex-1 flex justify-center items-center bg-[#152d3f] ">
        <SplitForm />
      </div>
    </div>
  );
};

export default SignUp;
