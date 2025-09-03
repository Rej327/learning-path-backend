import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { io } from '../../app';
import { v4 as uuidv4 } from 'uuid';

interface FileRecord {
    id: string;
    filename: string;
    url: string

}

const files: FileRecord[] = [];

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const file = {
        id: uuidv4(),
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`, // Add URL for access
    };
    files.push(file);

    io.emit('fileUploaded', file); // broadcast new file
    res.status(201).json(file);
};

export const getFiles = (req: Request, res: Response) => {
    res.json(files);
};

export const deleteFile = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = files.findIndex(f => f.id === id);
    if (index === -1) return res.status(404).json({ error: 'File not found' });

    fs.unlinkSync(path.join('uploads', files[index].filename));
    files.splice(index, 1);

    io.emit('fileDeleted', id); // notify clients
    res.status(200).json({ message: 'File deleted' });
};
