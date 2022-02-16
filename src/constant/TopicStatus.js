export const INIT = 1;
export const LOCKED = 2;
export const APPROVED = 3;
export const DONE = 4;
export const REMOVED = 0;


export function findName(value) {
    switch(value) {
        case INIT : return 'Khởi tạo'
        case LOCKED : return 'Đang diễn ra'
        case APPROVED : return 'Đã duyệt'
        case DONE : return 'Hoàn thành'
    }
}

export function findColor(value) {
    switch(value) {
        case INIT : return '#20c997'
        case LOCKED : return '#dc3535'
        case APPROVED : return '#999'
        case DONE : return '#999'
    }
}