import { Content, Review } from './Course';

export class Profile {
    name: string;
    rollNo: string;
    karmaPoints: number;
    image: string;
    fId: string;
    phone: string;
    myUploads: Content[];
    myReviews: Review[];
    constructor() {
        this.name = '';
        this.rollNo = '';
        this.karmaPoints = 0;
        this.image = '';
        this.fId = '';
        this.phone = '';
        this.myUploads = [];
        this.myReviews = [];
    }
}

