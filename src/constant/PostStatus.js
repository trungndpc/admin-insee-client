export const INIT = 1;
export const APPROVED = 2;
export const REMOVED = 0;

export function findName(value) {
    switch (value) {
        case INIT: return 'Khởi tạo'
        case APPROVED: return 'Đã công khai'
    }
}

export function findColor(value) {
    switch (value) {
        case INIT: return '#20c997'
        case APPROVED: return '#dc3545'
    }
}