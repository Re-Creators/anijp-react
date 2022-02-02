import MainLogin from "../components/login/MainLogin";
import useHelmetTitle from "../hooks/useHelmetTitle";

function Login() {
  useHelmetTitle("Login | AniJP");

  return (
    <>
      <MainLogin
        parentClassNames="flex flex-row"
        formClasssNames="p-10 w-full lg:w-2/3"
        formContainerClassNames="w-full md:w-1/2 bg-white min-h-screen  relative flex items-center justify-center"
        sidePanelClassNames="hidden md:w-1/2 h-full min-h-screen md:flex flex-col justify-between"
      />
    </>
  );
}

export default Login;
