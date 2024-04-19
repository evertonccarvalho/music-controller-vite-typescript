import BottomBar from "./components/BottomBar";
import MainScreen from "./components/MainScrea";
import ModalPlaylist from "./components/ModalPlaylist";
import Toast from "./components/Toast";

export default function App() {
  return <main className="flex flex-col h-screen">
    <Toast />
    <MainScreen />
    <BottomBar />
    <ModalPlaylist />
  </main>

}