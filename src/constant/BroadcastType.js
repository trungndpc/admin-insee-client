export const REQUEST_REGISTER_ZNS = 1;
export const BROADCAST_NORMAL_POST = 2;

export function findName(value) {
    switch (value) {
        case REQUEST_REGISTER_ZNS: return 'Gửi tin đăng ký bằng ZNS'
        case BROADCAST_NORMAL_POST: return 'Broadcast bài viết'
    }
}

export function findColor(value) {
    switch (value) {
        case REQUEST_REGISTER_ZNS: return '#20c997'
        case BROADCAST_NORMAL_POST: return '#dc3545'
    }
}