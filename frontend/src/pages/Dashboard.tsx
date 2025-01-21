import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";
import { Opendashboard } from "../icons/Opendashboard";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dash } from '../atoms';




function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const setDash = useSetRecoilState(dash);
  const dashValue = useRecoilValue(dash);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="p-4 px-10 min-h-screen bg-gray-100 w-full ">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-between items-center mb-4">
          <div
            onClick={() => {
              setDash(true);
            }}
            className={`cursor-pointer hover:text-purple-600 transition-all duration-200 ${(dashValue?"hidden":"block")}`} >
            <Opendashboard />
          </div>
          <div className="flex text-4xl font-semibold justify-center items-center transition-all duration-200">All Notes</div>
          <div className="flex justify-end gap-4">
            <Button
              varient="primary"
              text="Add contant"
              startIcon={<Plusicon />}
              onClick={() => {
                setModelOpen(true);
              }}
            ></Button>
            <Button
              varient="secondary"
              text="Share Brain"
              startIcon={<Shareicon />}
            ></Button>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Card
            type="twitter"
            link="https://x.com/mannupaaji/status/1878076302218912176"
            title="First Post"
          />
          <Card
            type="youtube"
            link="https://youtu.be/Ue5bOpVswIo?si=lJ8PFUQ-ystsPA8l"
            title="Second One"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
