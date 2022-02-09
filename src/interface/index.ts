export interface RegisterForm {
    phone: string,
    name: string,
    cityId: number,
    districtId: number,
    address: string,
    cements: Array<number>
}

export interface User {
    id: number,
    phone: string,
    status: number,
    name: string,
    avatar: string,
    cityId: number,
    districtId: number,
    address: string,
    products: Array<number>
}

export interface Post {
    id: number,
    title: string,
    cover: string,
    content: string,
    summary: string,
    status: number,
    promotionId: number,
    locations: Array<number>
    timeStart: number,
    timeEnd: number
}

export interface Page<T> {
    page: number,
    pageSize: number,
    totalPage: number,
    list: Array<T>
}

export interface Promotion {
    id: number,
    title: string,
    type: number,
    status: number,
    timeStart: number,
    timeEnd: number,
    postId: number,
    locations: Array<number>,
    cements: Array<number>
}

export interface Form {
    id: number,
    promotionId: number,
    userId: number,
    status: number,
    type: number,
    user: User,
    promotion: Promotion
}

export interface StatsForm {
    total: number,
    approved: number
}

export interface ImgRealtimePhoto {
    url: string,
    time: number,
    location: JSON
}

export interface StockForm extends Form {
    jsonImg: ImgRealtimePhoto
}

export interface Answer {
    id: string,
    content: string,
    right: boolean
}

export interface Question {
    id: string,
    content: string,
    options: Array<Answer>
}

export interface Topic {
    id : string;
    title : string;
    questions:  Array<Question>
    timeStart : number;
    timeEnd : number;
}

export interface LQPromotion extends Promotion {
    topics: Array<Topic>
}