import { CreateDonationDto } from '@/dtos/donations.dto';
import { HttpException } from '@exceptions/HttpException';
import { Donation, PrismaClient } from '@prisma/client';
import { isEmpty } from '@utils/util';

class DonationsService {
    public donations = new PrismaClient().donation;

    public findAllDonations = async (): Promise<Donation[]> => {
        const allDonations: Donation[] = await this.donations.findMany();
        return allDonations;
    };

    public findDonation = async (donationID: string): Promise<Donation> => {
        if (isEmpty(donationID)) throw new HttpException(400, 'donationID is empty');
        const donation: Donation = await this.donations.findUnique({
            where: {
                id: donationID,
            },
        });

        return donation;
    };

    public createDonation = async (donationData: CreateDonationDto): Promise<Donation> => {
        if (isEmpty(donationData)) throw new HttpException(400, 'donationData is empty');

        // create
        const { name, desc, expiryDate, image, target, donator } = donationData;
        const donation: Donation = await this.donations.create({
            data: {
                name,
                desc,
                image,
                target,
                donator,
                expiryDate,
            },
        });
        return donation;
    };

    public updateDonation = async (donationID: string, donationData: CreateDonationDto): Promise<Donation> => {
        if (isEmpty(donationID)) throw new HttpException(400, 'donationID is empty');
        if (isEmpty(donationData)) throw new HttpException(400, 'donationData is empty');

        // update
        // const { name, desc, expiryDate, image, target, donator } = donationData;
        const donation: Donation = await this.donations.update({
            where: {
                id: donationID,
            },
            data: {
                ...donationData,
            },
        });
        return donation;
    };

    public deleteDonation = async (donationID: string): Promise<Donation> => {
        if (isEmpty(donationID)) throw new HttpException(400, 'donationID is empty');
        const donation: Donation = await this.donations.delete({
            where: {
                id: donationID,
            },
        });

        return donation;
    };
}

export default DonationsService;
