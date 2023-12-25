import "./App.css";
import TaskWrapper from "./components/TaskWrapper";
import { SearchProvider, UserProvider } from "./components/Context";

function App() {
  return (
    <UserProvider>
      <SearchProvider>
        <div className="App">
          <TaskWrapper />
        </div>
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
