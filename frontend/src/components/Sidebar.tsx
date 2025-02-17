import { Sidebaritem } from "./Sidebaritem";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Docicon } from "../icons/Docicon";
import { Linkicon } from "../icons/Linkicon";
import { Tagicon } from "../icons/Tagicon";
import { Crossicon } from "../icons/Crossicon";
import { Logo } from "../icons/Logo";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dash } from '../atoms';

export function Sidebar() {
  const setDash = useSetRecoilState(dash);
  const dashValue = useRecoilValue(dash);
  return (
    <div className={` h-screen bg-white border-r w-96 left-0 top-0 ${dashValue ? "block" : "hidden"} translate-all duration-200`}>
      <div className="mt-4 ml-9 flex text-2xl font-semibold items-center cursor-default">
        <div className="mr-6 text-purple-600">
          <Logo />
        </div>
        Brainly
        <div
          onClick={() => {
            setDash(false);
          }}
          className="ml-20 text-2xl cursor-pointer outline outline-2 rounded-full hover:text-purple-600 transition-all duration-200">
          <Crossicon />
        </div>
      </div>
      <div className="pt-4">
        <Sidebaritem text="Twitter" icon={<Twittericon size={35} />} />
        <Sidebaritem text="Youtube" icon={<Youtubeicon size={40} />} />
        <Sidebaritem text="Documents" icon={<Docicon  size={8}/>} />
        <Sidebaritem text="Link" icon={<Linkicon size={8}/>} />
        <Sidebaritem text="Tags" icon={<Tagicon />} />
      </div>
    </div>
  );
}
