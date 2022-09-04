import { IMAGES_FOLDER_CLOUDINARY } from '@/config';
import StatusResponse from '@/interfaces/status.enum';
import cloudinary from '@/utils/cloudinary';
import { NextFunction, Request, Response } from 'express';

class UploadController {
    public uploadImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const imageStr = req.body.data;
            const imageResponse = await cloudinary.uploader.upload(imageStr, {
                folder: IMAGES_FOLDER_CLOUDINARY,
            });
            const imagePublicUrl = imageResponse.url;

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: {
                    url: imagePublicUrl,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UploadController;
