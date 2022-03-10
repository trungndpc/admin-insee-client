export const SENT = 2;
export const RECEIEVED = 3;


export function findName(value) {
    switch (value) {
        case SENT: return 'Chờ nhận'
        case RECEIEVED: return 'Đã nhận'
    }
}

export function findColor(value) {
    switch (value) {
        case SENT: return '#20c997'
        case RECEIEVED: return '#dc3535'
    }
}