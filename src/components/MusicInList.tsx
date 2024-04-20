import AddIcon from "./icons/AddIcon";
import DeleteIcon from "./icons/DeleteIcon";
import EmptyAlbumIcon from "./icons/EmptyAlbumIcon";

interface MusicInListProps {
  music: string;
}

export default function MusicInList({ music }: MusicInListProps) {

  const handleAdicionarMusica = (music: string) => {
    window.electronAPI.SendToElectron('music-to-play', music);
  };

  const handleDeleteMusic = (music: string) => {
    window.electronAPI.SendToElectron('music-delete', music)
  };

  return (
    <div className="m-5 p-2 flex flex-row border border-gray-500 w-full gap-2">
      <EmptyAlbumIcon />
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-white">Nome</h1>
          <h2 className="text-white">{music}</h2>
        </div>
        <div className="flex flex-row justify-center gap-5 h-full">
          <AddIcon onClick={() => { handleAdicionarMusica(music) }} />
          <DeleteIcon onClick={() => { handleDeleteMusic(music) }} />
        </div>
      </div>
    </div>
  );
}