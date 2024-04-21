import React from "react";
import Toast from "../components/Toast";
import MainScreen from "../components/MainScreen";
import BottomBar from "../components/BottomBar";
import ModalPlaylist from "../components/ModalPlaylist";

export default function HomePage() {
    return (
        <>
            <main className="flex flex-col h-screen">
                <Toast />
                <MainScreen />
                <BottomBar />
                <ModalPlaylist />
            </main>
        </>
    );
}
