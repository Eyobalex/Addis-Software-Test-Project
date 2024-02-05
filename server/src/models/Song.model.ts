import mongoose  from "mongoose";

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the song"],
    },
    artist: {
        type: String,
        required: [true, "Please provide an artist for the song"],
    },
    album: {
        type: String,
        required: [true, "Please provide an album for the song"],
    },
    gener: {
        type: String,
        required: [true, "Please provide a gener for the song"],
    },
});

export const Song = mongoose.model("Song", SongSchema);