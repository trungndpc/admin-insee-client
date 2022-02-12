export const  DISABLED = -1;
export const  WAIT_COMPLETE_PROFILE = 5;
export const  WAITING_ACTIVE = 7;
export const  WAIT_APPROVAL = 8;
export const  APPROVED = 10;

export function findName(value) {
    switch(value) {
        case DISABLED : return 'Khởi tạo'
        case WAIT_COMPLETE_PROFILE : return 'Chưa hoàn thành hồ sơ'
        case WAITING_ACTIVE : return 'Chờ kích hoạt'
        case WAIT_APPROVAL: return 'Chờ duyệt'
        case APPROVED : return 'Đã duyệt'
    }
}

export function findColor(value) {
    switch(value) {
        case DISABLED : return '#20c997'
        case WAIT_COMPLETE_PROFILE : return '#dc3535'
        case WAITING_ACTIVE : return '#6f42c1'
        case WAIT_APPROVAL : return '#dc3545'
        case APPROVED: return '#28a745'
    }
}