export const INIT = 1;
export const APPROVED = 2;
export const REJECTED = 3;

export function findName(value) {
    switch (value) {
        case INIT: return 'Chờ duyệt'
        case APPROVED: return 'Đã duyệt'
        case REJECTED: return 'Từ chối'
    }
}

export function findColor(value) {
    switch (value) {
        case INIT: return '#20c997'
        case APPROVED: return '#28a745'
        case REJECTED: return '#999'
    }
}