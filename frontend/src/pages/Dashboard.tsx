import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { ShareBrainModel } from "../components/ShareBrainModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";
import { Opendashboard } from "../icons/Opendashboard";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { dash } from '../atoms';
import { backendUrl } from "../envConfig";
import axios from "axios";




export function Dashboard() {
  const [AddModel, setAddModel] = useState(false);
  const [ShareModel, setShareModel] = useState(false);
  const setDash = useSetRecoilState(dash);
  const dashValue = useRecoilValue(dash);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${backendUrl}/api/v1/content`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await response.data.content;
        console.log(data);
        setContent(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Content fetching failed");
      } finally {
        setLoading(false);
      }
    }
    fetchContent();

  }, []);



  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="p-4 px-10 min-h-screen bg-gray-100 w-full ">
        <CreateContentModel
          open={AddModel}
          onClose={() => {
            setAddModel(false);
          }}
        />
        <ShareBrainModel
          open={ShareModel}
          onClose={() => {
            setShareModel(false);
          }}
        />
        <div className="flex justify-between items-center mb-4">
          <div className="flex text-4xl font-semibold justify-center items-center transition-all duration-200">
            <div
              onClick={() => {
                setDash(true);
              }}
              className={`cursor-pointer hover:text-purple-600 mr-12 ${(dashValue ? "hidden" : "block")}`} >
              <Opendashboard />
            </div>
            All Notes
          </div>
          <div className="flex justify-end gap-4">
            <Button
              varient="primary"
              text="Add contant"
              startIcon={<Plusicon />}
              onClick={() => {
                setAddModel(true);
              }}
              animate={true}
            ></Button>
            <Button
              varient="secondary"
              text="Share Brain"
              startIcon={<Shareicon />}
              onClick={() => {
                setShareModel(true);
              }}
              animate={true}
            ></Button>
          </div>
        </div>
        <div className="flex gap-8 flex-wrap justify-start">
          <Card
            type="link"
            link="https://difficult-hosta-226.notion.site/11-Building-a-second-brain-app-16e4681ba151808e982ccc7f73fc7b48"
            title="Third One"
          />
          {content.map((item) => {
            return <Card
              key={item._id}
              title={item.title}
              type={item.type}
              content={item.content}
              link={item.link}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
