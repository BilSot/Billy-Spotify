import React from "react";
import PlaylistDropdown from "./PlaylistDropdown";
import {PlaylistModel} from "../types/models";

interface MainContentProps {
    playlists: PlaylistModel[],
    fetchTracksFromPlaylist: (playlistId: string) => void
}

const MainContent: React.FC<MainContentProps> = ({playlists, fetchTracksFromPlaylist}) => {
    return (
        <div>
            <p>Main content</p>
            <PlaylistDropdown playlists={playlists} fetchTracksFromPlaylist={fetchTracksFromPlaylist}/>
        </div>
    )
}

export default MainContent;
