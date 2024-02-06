import express from 'express';
import { serverErrorResponse, successResponse } from 'helpers/response.js';

import {getAll , getById, create , update , destroy } from '../services/song.service.js';
import { ISong } from 'types/song.type.js';
export const getAllSongs = async (req: express.Request, res : express.Response) => {
    try {
        const songs = await getAll();
        return successResponse(res, songs, "Songs retrived successfully!", 200);
    } catch (error) {
        console.log("🚀 ~ getAll ~ error:", error)
        return serverErrorResponse(res);
    }
}
export const getSongById = async (req: express.Request, res : express.Response) => {
    try {

        const {songId} = req.params;
        const song = await getById(songId);
        return successResponse(res, song, "Song retrived successfully.", 200);
        
    } catch (error) {
        console.log("🚀 ~ getAll ~ error:", error)
        return serverErrorResponse(res);
    }
}

export const createSong = async (req: express.Request, res: express.Response) => {

    try{

        const songRequest: ISong = req.body;
        const newSong = await create(songRequest);
        return successResponse(res, newSong, "Song created successfully.", 201);

    }catch(error){
        console.log("🚀 ~ getAll ~ error:", error)
        return serverErrorResponse(res);
    }
}

export const updateSong = async (req: express.Request, res: express.Response) => {
    try{

        const songRequest: ISong = req.body;
        const {songId} = req.params;
        const updatedSong = await update(songId, songRequest);
        return successResponse(res, updatedSong, "Song updated successfully.", 200);

    }catch(error){
        console.log("🚀 ~ getAll ~ error:", error)
        return serverErrorResponse(res);
    }
}
export const deleteSong = async (req: express.Request, res: express.Response) => {
    try{
        const {songId} = req.params;
        await destroy(songId);
        return successResponse(res, null, "Song deleted successfully.", 200);

    }catch(error){
        console.log("🚀 ~ getAll ~ error:", error)
        return serverErrorResponse(res);
    }
}