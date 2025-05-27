import { useParams } from "react-router-dom";
import { Toaster } from "sonner";


export default function ShareBrain() {
    const { shareLink } = useParams<{ shareLink: string }>();



  return (
    <div>
      <Toaster />
    </div>
  )
}
