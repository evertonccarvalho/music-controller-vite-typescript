import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export interface ElectronAPI {
    SendToElectron: (channel: string, data?: unknown) => void;
    ReciveFromElectron: (channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
}

const electronAPI: ElectronAPI = {
    SendToElectron: (channel, data) => {
        console.log(`Sending message to Electron on channel: ${channel}`);
        ipcRenderer.send(channel, data);
    },
    ReciveFromElectron: (channel, func) => {
        console.log(`Listening for messages from Electron on channel: ${channel}`);
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    },
};

console.log('Exposing electronAPI to the renderer process.');

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
