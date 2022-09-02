import { HttpException } from '@/exceptions/HttpException';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const minimumPermissionLevelRequried = (permissionRequired: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissionLevel = convertRoleEnum(req['user']?.role);
        const permissionLevelRequired = convertRoleEnum(permissionRequired);

        if (permissionLevel < permissionLevelRequired) {
            next(new HttpException(403, "Don't allow to access"));
        }
        next();
    };
};

const convertRoleEnum = (role: Role) => {
    switch (role) {
        case 'USER':
            return 1;
            break;
        case 'ADMIN':
            return 2;
        default:
            return 0;
    }
};

export default minimumPermissionLevelRequried;
