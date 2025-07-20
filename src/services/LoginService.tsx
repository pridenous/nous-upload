import api from '@/api/axios';
import type { GoogleRequest } from '@/interfaces/GoogleRequest'
import type { UploadedFile } from '@/interfaces/UploadedFile'

export const LoginByGoogle = async (
     access_token: string|undefined
): Promise<UploadedFile[]> => {
    const data: GoogleRequest = {
        access_token: access_token
    };
    const response = await api.post('/api/login/GoogleLogin', data);
    return response.data
}

