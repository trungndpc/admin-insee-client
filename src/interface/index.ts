export interface RegisterForm {
    inseeId: string,
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
    inseeId: string
    createdTime: number
}

export interface Post {
    id: number,
    title: string,
    cover: string,
    content: string,
    summary: string,
    status: number,
    promotionId: number,
    cityIds: Array<number>
    districtIds: Array<number>
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
    cityIds: Array<number>,
    districtIds: Array<number>,
    cements: Array<number>
}

export interface Form {
    id: number,
    promotionId: number,
    userId: number,
    status: number,
    type: number,
    user: User,
    time: number
    promotion: Promotion
    note: string
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
    jsonImgs: Array<ImgRealtimePhoto>
    bags : number,
    cements: Array<number>
}

export interface TopicLightingQuizForm {
    topicId: string,
    timeStart: number,
    timeEnd: number,
}

export interface LightingQuizForm extends Form {
    point: number,
    topicId: string,
    jsonDetail: TopicLightingQuizForm
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
    id: string;
    title: string;
    questions: Array<Question>
    timeStart: number;
    timeEnd: number;
    status: number;
}

export interface LQPromotion extends Promotion {
    topics: Array<Topic>
}

export interface UserFilter {
    cityId: number,
    status: number,
    search: string
}

export interface FormFilter {
    cityId: number,
    status: number,
    search: string
    promotionIds: Array<number>
}

export interface CountUserDashboard {
    numUser: number,
    numApprovedUser: number,
    numWaitingActiveUser: number,
    numWaitingReviewUser: number,
}

export interface UserDateMetric {
    date: string,
    total: number
}

export interface UserCityMetric {
    city: number,
    total: number
}

export interface FormGift {
    type: number,
    totalValue: number
    cardPhones: Array<CardPhoneGift>
}

export interface CardPhoneGift {
    id: number,
    network: number,
    value: number,
    seri: string,
    code: string
}


export interface Broadcast {
    id: number,
    name: string,
    timeStart: number,
    status: number,
    type: number,
    cityIds: Array<number>,
    districtIds: Array<number>,
    postId: number,
    seen: number,
    click: number,
    totalUids: number,
    totalUidsAfterBuildUser: number,
    totalUidsSuccessSend: number
    userIds: Array<number>
}

export interface FormPromotionMetric {
    promotionId: number,
    total: number,
    promotion: Promotion
}

export interface CountGiftDTO { 
    total : number,
    send : number,
    received : number
}

export interface CountPromotionDTO {
    promotion : number,
    engagement : number
}

export interface CountFormDTO { 
    total: number,
    init : number,
    approved: number,
    sendGift: number,
    receivedGift: number
}