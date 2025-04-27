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
import { dash, selectedContentType } from '../atoms';
import { backendUrl } from "../envConfig";
import axios from "axios";

export function Dashboard() {
  const [AddModel, setAddModel] = useState(false);
  const [ShareModel, setShareModel] = useState(false);
  const setDash = useSetRecoilState(dash);
  const dashValue = useRecoilValue(dash);
  const selectedType = useRecoilValue(selectedContentType);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleContentDelete = () => {
    fetchContent();
  };

  console.log(loading);

  const filteredContent = selectedType === 'all' 
    ? content 
    : content.filter(item => item.type === selectedType);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="p-4 px-4 md:px-10 min-h-screen bg-gray-100 w-full">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex text-2xl md:text-4xl font-semibold justify-center items-center transition-all duration-200">
            <div
              onClick={() => {
                setDash(true);
              }}
              className={`cursor-pointer hover:text-purple-600 mr-4 md:mr-12 ${(dashValue ? "hidden" : "block")}`} >
              <Opendashboard />
            </div>
            {selectedType === 'all' ? 'All Notes' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Notes`}
          </div>
          <div className="flex justify-end gap-2 md:gap-4 w-full md:w-auto">
            <Button
              varient="primary"
              text="Add content"
              startIcon={<Plusicon />}
              onClick={() => {
                setAddModel(true);
              }}
              animate={true}
            />
            <Button
              varient="secondary"
              text="Share Brain"
              startIcon={<Shareicon />}
              onClick={() => {
                setShareModel(true);
              }}
              animate={true}
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredContent.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-xl mt-8">
              No {selectedType === 'all' ? '' : selectedType} content found
            </div>
          ) : (
            filteredContent.map((item) => (
              <Card
                key={item._id}
                _id={item._id}
                title={item.title}
                type={item.type}
                content={item.content}
                link={item.link}
                onDelete={handleContentDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
