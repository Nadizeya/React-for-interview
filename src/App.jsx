import ExampleOne from "./components/ExampleOne";
import CopyDomToPortal from "./components/Portal";
import State from "./components/State";

function App() {
  return (
    <div>
      {/* <State /> */}
      {/* <ExampleOne /> */}
      <CopyDom sourceSelector="#some-existing-dom" />
    </div>
  );
}

export default App;
