// src/components/ImageUploader.tsx
import { Close, Task } from '@mui/icons-material';
import Upload from '@mui/icons-material/Upload';
import { Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    setFileBase64: React.Dispatch<React.SetStateAction<string | null>>;
    fileBase64: string | null;
}

export const ImageUploader = ({ setFileBase64, fileBase64 }: Props) => {
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fileBase64) {
            setUploadStatus('success');
        }
    }, [fileBase64]);

    const handleFileUpload = async (file: File) => {
        setUploadStatus('loading');
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFileBase64(reader.result as string);
            setUploadStatus('success');
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleReset = () => {
        setUploadStatus('idle');
        setFileName(null);
        setFileBase64(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            {uploadStatus === 'success' ? (
                <Paper elevation={3} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Task color='primary' />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                                style={{
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    lineHeight: '21px',
                                    color: '#59bef8',
                                }}
                            >{fileName}</span>

                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                        <IconButton onClick={handleReset}>
                            <Close />
                        </IconButton>
                    </div>
                </Paper>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    border="1px dashed #a4d9fa"
                    borderRadius={2}
                    justifyContent="space-between"
                    p={1}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    style={{ backgroundColor: isDragging ? '#f0f0f0' : 'transparent', cursor: 'pointer' }}
                >
                    <input
                        type="file"
                        accept=".jpg,.png,.pdf"
                        hidden
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                    />
                    {uploadStatus === 'idle' && (
                        <>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <Upload color='primary' />
                                <Typography variant='body2'>Arrastra el archivo o haz click para cargar</Typography>
                            </div>
                        </>
                    )}
                    {uploadStatus === 'loading' && (
                        <>
                            <CircularProgress />
                            <Typography>Cargando...</Typography>
                        </>
                    )}
                </Box>
            )}
        </>
    );
};
