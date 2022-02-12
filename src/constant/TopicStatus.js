export const INIT = 1;
export const LOCKED = 2;
export const APPROVED = 3;


export function findName(value) {
    switch(value) {
        case INIT : return 'Khởi tạo'
        case LOCKED : return 'Đang diễn ra'
        case APPROVED : return 'Hoàn thành'
    }
}

export function findColor(value) {
    switch(value) {
        case INIT : return '#20c997'
        case LOCKED : return '#dc3535'
        case APPROVED : return '#999'
    }
}