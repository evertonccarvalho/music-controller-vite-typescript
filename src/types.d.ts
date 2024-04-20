interface ElectronWindow {
    SendToElectron: (channel: string, args?: string) => Promise<void>;
    ReciveFromElectron: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
}

declare interface Window {
    electronAPI: ElectronWindow;
}
