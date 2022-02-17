import data from './province.json'

function compare(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

var listCity = [];
var optionsCity = [];
for (const key in data) {
    let r = { key: key, value: data[key].name }
    if (data[key].status != 0) {
        listCity.push(r);
        optionsCity.push({ value: key, label: data[key].name })
    }
}
listCity = listCity.sort(compare)
optionsCity = optionsCity.sort(compare)


var listDistrict = [];
for (const key in data) {
    let city = data[key];
    let districts = city["districts"];
    districts.forEach(district => {
        let o = { key: district.id, value: { name: district.name, cityId: key } }
        listDistrict.push(o);
    });
}


export class City {

    static getName(id) {
        for (const key in data) {
            if (id == key) {
                return data[key].name;
            }
        }
        return null;
    }

    static getList() {
        return listCity
    }

    static getOptions() {
        return optionsCity;
    }
}

export class District {
    static getName(districtId) {
        for (const district of listDistrict) {
            if (district.key == districtId) {
                return district.value.name;
            }
        }
    }

    static getList(cityId) {
        if (cityId == 0) {
            return []
        }
        let city = data[cityId];
        let districts = city ? city.districts : [];
        let rs = []
        for (const district of districts) {
            let o = { key: district.id, value: district.name }
            rs.push(o);
        }
        rs = rs.sort(compare);
        return rs;
    }

    static getOption(listCityIds) {
        let options = []
        for (const cityId of listCityIds) {
            let lstDistrict = this.getList(cityId)
            if (lstDistrict) {
                for (const ldistrict of lstDistrict) {
                    let option = { value: ldistrict.key, label: ldistrict.value }
                    options.push(option);
                }
            }
        }
        return options;
    }
}