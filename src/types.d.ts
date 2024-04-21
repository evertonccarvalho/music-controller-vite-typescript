interface ElectronAPI {
    SendToElectron: (channel: string, data?: unknown) => void;
    ReciveFromElectron: (channel: string, func: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
}

declare interface Window {
    electronAPI: ElectronAPI;
}
