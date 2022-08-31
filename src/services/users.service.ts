import { hash } from 'bcrypt';
import { Order, PrismaClient, User } from '@prisma/client';
import { UserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class UserService {
    public users = new PrismaClient().user;

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findMany();
        return allUser;
    }

    public async findUserById(userId: string): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

        const findUser: User = await this.users.findUnique({ where: { id: userId } });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public async createUser(userData: UserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

        const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });
        return createUserData;
    }

    public async updateUser(userId: string, userData: UserDto): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

        const findUser: User = await this.users.findUnique({ where: { id: userId } });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const updateUserData = await this.users.update({ where: { id: userId }, data: { ...userData } });
        return updateUserData;
    }

    public async deleteUser(userId: string): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

        const findUser: User = await this.users.findUnique({ where: { id: userId } });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const deleteUserData = await this.users.delete({ where: { id: userId } });
        return deleteUserData;
    }

    // public async findUserOrders(userId: string): Promise<Order[]> {
    //     if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    //     const foundUser: User = await this.usersi
    // }
}

export default UserService;
