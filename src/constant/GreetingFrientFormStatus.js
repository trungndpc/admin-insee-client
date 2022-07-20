export const WAITING_SUBMIT = 0;
export const INIT = 1;
export const APPROVED = 2;
export const REJECTED = 3;
export const SEND_GIFT = 4;
export const RECEIVED = 5;

export function findName(value) {
    switch (value) {
        case INIT: return 'Chờ duyệt'
        case APPROVED: return 'Đã duyệt'
        case REJECTED: return 'Từ chối'
        case SEND_GIFT: return 'Đã gửi quà'
        case WAITING_SUBMIT : return 'Chờ submit'
        case RECEIVED : return 'Đã nhận'
    }
}

export function findColor(value) {
    switch (value) {
        case INIT: return '#20c997'
        case APPROVED: return '#28a745'
        case REJECTED: return '#999'
        case SEND_GIFT: return '#28a745'
        case WAITING_SUBMIT : return '#28a745'
        case RECEIVED : return '#28a745'
    }
}