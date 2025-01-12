import { Sidebaritem } from "./Sidebaritem";
import { Twittericon } from "./../icons/Twittericon";
import { Youtubeicon } from "./../icons/Youtubeicon";
import { Logo } from "../icons/Logo";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
      <div className="mt-4 ml-12 flex text-2xl font-semibold items-center cursor-default">
        <div className="mr-4 text-purple-600">
          <Logo />
        </div>
        Brainly
      </div>
      <div className="pt-4">
        <Sidebaritem text="Twitter" icon={<Twittericon />} />
        <Sidebaritem text="Youtube" icon={<Youtubeicon />} />
      </div>
    </div>
  );
}
