export class CementEnum {
    constructor(id, name, group) {
        this.id = id;
        this.name = name;
        this.group = group;
    }
}

export function findById(id) {
    switch (id) {
        case 1: return POWERS;
        case 2: return WALL_PRO;
        case 3: return LAVILLA_EXTRA_CC40;
        case 4: return EXTRA_DURABLE_HOUSING;
        case 5: return POWER_FAST;
        case 6: return QUICK_CAST;
        case 7: return STABLE_SOIL;
        case 8: return COMPACT_ROCK;
        case 9: return EXTRA_DURABLE;
        case 10: return MASS_POUR;
        case 11: return EASY_FLOW;
        case 12: return POWER_CAST;
        case 13: return PITU_FILL;
        case 14: return TILE_GROUT_ULTRA;
        case 15: return TILEFIX_PLUS_25KG;
        case 16: return TILEFIX_PLUS_5KG;
        case 17: return FLEX_SHIELD_5KG;
        case 18: return FLEX_SHIELD_18KG;
        case 19: return TILEGROUT_NANO;
        case 20: return TILEFIX_PRO;
    }
}

export function getList() {
    return [POWERS, WALL_PRO, LAVILLA_EXTRA_CC40, EXTRA_DURABLE_HOUSING, 
        POWER_FAST, QUICK_CAST, STABLE_SOIL, COMPACT_ROCK, EXTRA_DURABLE, 
        MASS_POUR, EASY_FLOW, POWER_CAST, PITU_FILL,TILE_GROUT_ULTRA,
        TILEFIX_PLUS_25KG, TILEFIX_PLUS_5KG, FLEX_SHIELD_5KG, FLEX_SHIELD_18KG, TILEGROUT_NANO, TILEFIX_PRO]
}

export function getListForRetailer() {
    return [POWERS, WALL_PRO, LAVILLA_EXTRA_CC40, EXTRA_DURABLE_HOUSING]
}

export function getOption() {
    const list = getList();
    return list.map(item => {
        return { value: item.id, label: item.name };
    });
}

export const POWERS = new CementEnum(1, "INSEE Power-S", 1);
export const WALL_PRO = new CementEnum(2, "INSEE Wall Pro", 1);
export const LAVILLA_EXTRA_CC40 = new CementEnum(3, "Lavilla Xtra CC40", 1);
export const EXTRA_DURABLE_HOUSING = new CementEnum(4, "INSEE Extra Durable", 1);
export const POWER_FAST = new CementEnum(5, "INSEE Power Fast ", 1);
export const QUICK_CAST = new CementEnum(6, "INSEE Quick Cast ", 2);
export const STABLE_SOIL = new CementEnum(7, "INSEE Stable Soil ", 2);
export const COMPACT_ROCK = new CementEnum(8, "INSEE Compact Rock ", 2);
export const EXTRA_DURABLE = new CementEnum(9, "INSEE Extra Durable ", 2);
export const MASS_POUR = new CementEnum(10, "INSEE Mass Pour", 2);
export const EASY_FLOW = new CementEnum(11, "INSEE Easy Flow", 2);
export const POWER_CAST = new CementEnum(12, "INSEE Power Cast", 2);
export const PITU_FILL = new CementEnum(13, "INSEE Pitu Fill ", 2);
export const TILE_GROUT_ULTRA = new CementEnum(14, "INSEE TileGrout Ultra+",2);
export const TILEFIX_PLUS_25KG = new CementEnum(15, "INSEE TileFix Plus 25kg", 2);
export const TILEFIX_PLUS_5KG = new CementEnum(16, "INSEE TileFix Plus 5kg", 2)
export const FLEX_SHIELD_5KG = new CementEnum(17, "INSEE Flex Shield 5kg", 2)
export const FLEX_SHIELD_18KG = new CementEnum(18, "INSEE Flex Shield 18kg", 2)
export const TILEGROUT_NANO = new CementEnum(19, "INSEE TileGrout NANO", 2)
export const TILEFIX_PRO = new CementEnum(20, "INSEE TileFix PRO", 2)
