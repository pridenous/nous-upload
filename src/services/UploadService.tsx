import api from '@/api/axios'
import type { UploadedFile } from '@/interfaces/UploadedFile'
import type { RequestFileUpload } from '@/interfaces/RequestFileUpload'
import type { RequestFileEdit } from '@/interfaces/RequestFileEdit'

export const getUploadedFiles = async (): Promise<UploadedFile[]> => {
  const response = await api.get<UploadedFile[]>('/api/upload/GetListFiles')
  return response.data
}

export const UploadFile = async (
     filename: string,
     description: string,
     contentData: string
): Promise<UploadedFile[]> => {
    const data: RequestFileUpload = {
        fileName: filename,
        description: description,
        content: contentData
    };
    const response = await api.post('/api/upload/UploadFiles', data);
    return response.data
}

export const DeleteFile = async (
     id: string
): Promise<UploadedFile[]> => {
    const response = await api.post('/api/upload/DeleteFiles', null, {
        params: {
            id: id.toString()
        }
    });
    return response.data
}

export const EditFile = async (
     id: string,
     filename: string,
     description: string,
     contentData: string
): Promise<UploadedFile[]> => {
    const data: RequestFileEdit = {
        id: id.toString(),
        filename: filename,
        description: description,
        content: contentData
    };
    const response = await api.post('/api/upload/EditFiles', data);
    return response.data
}