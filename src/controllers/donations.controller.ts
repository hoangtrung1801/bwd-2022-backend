import { CreateDonationDto } from '@/dtos/donations.dto';
import StatusResponse from '@/interfaces/status.enum';
import DonationsService from '@/services/donations.service';
import { Donation } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

class DonationsController {
    public donationsService = new DonationsService();

    public getDonations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allDonations: Donation[] = await this.donationsService.findAllDonations();

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: allDonations,
            });
        } catch (error) {
            next(error);
        }
    };

    public getDonation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const donationID = req.params.id;
            const donation: Donation = await this.donationsService.findDonation(donationID);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: donation,
            });
        } catch (error) {
            next(error);
        }
    };

    public createDonation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const donationData: CreateDonationDto = req.body;
            const donation: Donation = await this.donationsService.createDonation(donationData);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: donation,
            });
        } catch (error) {
            next(error);
        }
    };

    public updateDonation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const donationID = req.params.id;
            const donationData: CreateDonationDto = req.body;

            const donation: Donation = await this.donationsService.updateDonation(donationID, donationData);
            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: donation,
            });
        } catch (error) {
            next(error);
        }
    };

    public deleteDonation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const donationID = req.params.id;
            const donation: Donation = await this.donationsService.deleteDonation(donationID);

            res.status(200).json({
                status: StatusResponse.SUCCESS,
                data: donation,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default DonationsController;
