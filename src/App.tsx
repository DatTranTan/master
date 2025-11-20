import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { color } from "./constants/theme";
import { ContextProvider } from "./context/context";
import Routes from "./routers";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ConfigProvider
          locale={vi_VN}
          theme={{
            token: {
              colorPrimary: color.default,
            },
          }}
        >
          <Routes />
        </ConfigProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
