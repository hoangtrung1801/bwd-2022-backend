import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { UserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';

class AuthService {
    public users = new PrismaClient().user;

    public async signup(userData: UserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

        return createUserData;
    }

    public async login(userData: UserDto): Promise<{ cookie: string; findUser: User }> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
        if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser };
    }

    public async logout(userData: User): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const findUser: User = await this.users.findFirst({
            where: {
                email: userData.email,
                //  password: userData.password
            },
        });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user.id };
        const secretKey: string = SECRET_KEY;
        const expiresIn: number = 60 * 60 * 24 * 7;

        return { expiresIn, token: sign(dataStoredInToken, secretKey, {}) };
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=Bearer ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/; Secure; SameSite=None`;
        // return `Bearer ${tokenData.token}`;
    }
}

export default AuthService;
