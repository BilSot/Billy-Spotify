import React from "react";
import PlaylistDropdown from "../PlaylistContent/PlaylistContent";
import {DraftPlaylist, PlaylistModel} from "../../types/models";
import "./MainContent.css";

interface MainContentProps {
    playlists: PlaylistModel[],
    createNewPlaylist: (playlist: DraftPlaylist) => void,
    fetchTracksFromPlaylist: (playlistId: string) => void
}

const MainContent: React.FC<MainContentProps> = ({playlists, createNewPlaylist, fetchTracksFromPlaylist}) => {
    return (
        <div className="main-content-component col-12">
            <PlaylistDropdown playlists={playlists} createNewPlaylist={createNewPlaylist} fetchTracksFromPlaylist={fetchTracksFromPlaylist}/>
        </div>
    )
}

export default MainContent;
