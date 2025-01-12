import { Button } from "./components/Button";
import { Card } from "./components/Card";
import {Plusicon} from "./icons/Plusicon";
import {Shareicon} from "./icons/Shareicon"


function App() {
  return (
    <div>
      <Button
        varient="primary"
        text="Add contant"
        startIcon={<Plusicon/>}
      ></Button>
      <Button
        varient="secondary"
        text="Share Brain"
        startIcon={<Shareicon/>}
      ></Button>
      <Card type="twitter" link="https://x.com/mannupaaji/status/1878076302218912176" title="First Post"/>
      <Card type="youtube" link="https://youtu.be/Ue5bOpVswIo?si=lJ8PFUQ-ystsPA8l" title="Second onew"/>
    </div>
  );
}

export default App;
