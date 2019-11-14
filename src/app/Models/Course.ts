export class Course {
    slot: string;
    additionalSlot: string;
    credits: number;
    room: string;
    preq: string;
    maxStrength: number;
    offeredForBTechDD: string;
    
    id: string;
    name: string;
    instructerName: string;
    reviews: Review[];
    fAQs: FAQ[];
    contents: Content[];

    constructor() {
        this.id = '';
        this.name = '';
        this.instructerName = '';
        this.reviews = [];
        this.fAQs = [];
        this.contents = [] ;
    }


}
export class Review {
    courseId: string;
    review: string;
    fId: string;
    fromRollNo: string;
    fromName: string;
    fromFid: string;
    at: number;
    upVotes: number;
    downVotes: number;
    upVotedBy: string[];
    downVotedBy: string[];

    constructor() {
        this.courseId = '';
        this.fromFid = '';
        this.fId = '';
        this.review = '';
        this.fromRollNo = '';
        this.fromName = '';
        this.at = 0;
        this.upVotes = 0;
        this.downVotes = 0;
        this.upVotedBy = [];
        this.downVotedBy = [];

    }
}
export class FAQ {
    question: string;
    fId: string;
    at: number;
    askedByFid: string ;
    askedByName: string;
    askedByRollNo: string;
    answers: Answer[];

    constructor() {
    this.fId = '';
    this.question = '';
    this.askedByName = '';
    this.askedByFid = '';
    this.askedByRollNo = '';
    this.at = 0;
    this.answers = [];
    }
}

export class Answer {
    answer: string;
    fromName: string;
    fId: string;
    fromRollNo: string;
    fromFid: string;
    at: number;
    upVotes: number;
    downVotes: number;
    upVotedBy: string[];
    downVotedBy: string[];

    constructor() {
        this.answer = '';
        this.fromName = '';
        this.fromRollNo = '';
        this.fromFid = '';
        this.at = 0;
        this.upVotes = 0;
        this.downVotes = 0;
        this.upVotedBy = [];
        this.downVotedBy = [];

    }
}
export class Content {
    fId: string;

    courseName: string;
    courseId: string;
    documentType: string;
    documentAddress: string;
    fileType: string;
    uploadedByName: string;
    uploadedByFId: string;
    uploadedByRollNo: string;
    uploadedAt: number;
    upVotes: number;
    downVotes: number;
    upVotedBy: string[];
    downVotedBy: string[];

    constructor() {
        this.fId = '';
        this.courseName = '';
        this.courseId = '';
        this.documentType = '';
        this.fileType = '';
        this.uploadedByName = '';
        this.uploadedByRollNo = '';
        this.uploadedByFId = '';
        this.uploadedAt = 0 ;
        this.upVotes = 0;
        this.downVotes = 0;
        this.upVotedBy = [];
        this.downVotedBy = [];
    }
}
