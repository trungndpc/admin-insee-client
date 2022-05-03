export const STOCK_PROMOTION_TYPE = 20;
export const LIGHTING_QUIZ_GAME_PROMOTION_TYPE = 21;
export const PREDICT_FOOTBALL = 4;

export function findName(value) {
    switch (value) {
        case STOCK_PROMOTION_TYPE: return 'Stock Promotion'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE: return 'Lighting Quiz Game'
        case PREDICT_FOOTBALL: return 'Dự đoán bóng đá'
    }
}

export function findColor(value) {
    switch (value) {
        case STOCK_PROMOTION_TYPE: return '#20c997'
        case LIGHTING_QUIZ_GAME_PROMOTION_TYPE: return '#dc3535'
        case PREDICT_FOOTBALL: return '#dc3535'
    }
}