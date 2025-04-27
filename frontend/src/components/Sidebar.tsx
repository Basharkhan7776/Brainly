import { Sidebaritem } from "./Sidebaritem";
import { Twittericon } from "../icons/Twittericon";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Docicon } from "../icons/Docicon";
import { Linkicon } from "../icons/Linkicon";
import { Crossicon } from "../icons/Crossicon";
import { Logo } from "../icons/Logo";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dash, selectedContentType } from '../atoms';
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const setDash = useSetRecoilState(dash);
  const dashValue = useRecoilValue(dash);
  const setSelectedType = useSetRecoilState(selectedContentType);
  const currentType = useRecoilValue(selectedContentType);

  const handleTypeSelect = (type: 'all' | 'twitter' | 'youtube' | 'document' | 'link') => {
    setSelectedType(type);
  };

  return (
    <div className={`fixed md:relative h-screen bg-white border-r w-full md:w-96 left-0 top-0 z-50 ${dashValue ? "block" : "hidden"} translate-all duration-200`}>
      <div className="mt-4 ml-4 md:ml-9 flex text-xl md:text-2xl font-semibold items-center cursor-default" >
        <div className="flex items-center" onClick={() => { navigate("/") }}>
          <div className="mr-4 md:mr-6 text-purple-600">
            <Logo />
          </div>
          Brainly
        </div>
        <div
          onClick={() => {
            setDash(false);
          }}
          className="ml-auto md:ml-20 text-xl md:text-2xl cursor-pointer outline outline-2 rounded-full hover:text-purple-600 transition-all duration-200">
          <Crossicon />
        </div>
      </div>
      <div className="pt-4">
        <Sidebaritem 
          text="All" 
          icon={<Logo />} 
          selected={currentType === 'all'}
          onClick={() => handleTypeSelect('all')}
        />
        <Sidebaritem 
          text="Twitter" 
          icon={<Twittericon size={35} />} 
          selected={currentType === 'twitter'}
          onClick={() => handleTypeSelect('twitter')}
        />
        <Sidebaritem 
          text="Youtube" 
          icon={<Youtubeicon size={40} />} 
          selected={currentType === 'youtube'}
          onClick={() => handleTypeSelect('youtube')}
        />
        <Sidebaritem 
          text="Documents" 
          icon={<Docicon size={8} />} 
          selected={currentType === 'document'}
          onClick={() => handleTypeSelect('document')}
        />
        <Sidebaritem 
          text="Link" 
          icon={<Linkicon size={8} />} 
          selected={currentType === 'link'}
          onClick={() => handleTypeSelect('link')}
        />
      </div>
    </div>
  );
}
