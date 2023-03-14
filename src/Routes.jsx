import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Reciters from "./pages/Reciters/Reciters";
import Playlist from "./pages/Playlist";
import Root from "./pages/Root/Root";
import Quran from "./pages/Quran/Quran";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Surahs from "./pages/Surahs/Surahs";
const routerDef = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index={true} element={<Home />} />
    <Route path={"/reciters"} element={<Reciters />} />
    <Route path={"/reciters/:reciterId/:moshafId"} element={<Quran />} />
    <Route path={"/playlists"} element={<Playlist />} />
    <Route path={"/settings"} element={<Settings />} />
    <Route path={"/login"} element={<Login />} />
    <Route path={"/signUp"} element={<SignUp />} />
  </Route>
);
const router = createBrowserRouter(routerDef);

export default router;
