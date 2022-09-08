import DonationsController from '@/controllers/donations.controller';
import { CreateDonationDto } from '@/dtos/donations.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class DonationRoute implements Routes {
    public path = '/api/donations';
    public router = Router();
    public donationsController = new DonationsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.donationsController.getDonations);
        this.router.get('/:id', this.donationsController.getDonation);
        this.router.post('/', validationMiddleware(CreateDonationDto, 'body'), this.donationsController.createDonation);
        this.router.put('/:id', validationMiddleware(CreateDonationDto, 'body', true), this.donationsController.updateDonation);
        this.router.delete('/:id', this.donationsController.deleteDonation);
        // this.router.post(`/signup`, validationMiddleware(UserDto, 'body'), this.donationsController.signUp);
        // this.router.post(`/login`, validationMiddleware(LoginUserDto, 'body'), this.donationsController.logIn);
        // this.router.post(`/logout`, this.donationsController.logOut);
        // this.router.get('/user', this.donationsController.getUserFromToken);
    }
}

export default DonationRoute;
