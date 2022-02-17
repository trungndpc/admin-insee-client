export const INIT = 1;
export const APPROVED = 2;
export const DELETED = 3;
export const CANCELED = 4;
export const DONE = 5;
export const FAILED = 6;

export function findName(value) {
    switch (value) {
        case INIT: return 'Mới khởi tạo'
        case APPROVED: return 'Đã duyệt'
        case DELETED: return 'Đã xóa'
        case CANCELED: return 'Đã hủy'
        case DONE: return 'Hoàn thành'
        case FAILED: return 'Thất bại'
    }
}

export function findColor(value) {
    switch (value) {
        case INIT: return '#20c997'
        case APPROVED: return '#dc3545'
        case DELETED: return '#20c997'
        case CANCELED: return '#20c997'
        case DONE: return '#20c997'
        case FAILED: return '#20c997'
    }
}