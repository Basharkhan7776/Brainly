import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
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
        <div className="flex gap-2">
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
