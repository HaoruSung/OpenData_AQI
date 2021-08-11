export class OpenDataAQI {
    include_total: boolean;
    resource_id: string;
    fields: Field[];
    __extras: Extras;
    records_format: string;
    records: RecordData[];
    limit: number;
    offset: number;
    _links: Links;
    total: number;
}

export class Field {
    info: Info;
    type: string;
    id: string;
}

export class Info {
    notes: string;
    label: string;
}

export class Extras {
    api_key: string;
}

export class RecordData {
    SiteName: string;
    County: string;
    AQI: number;
    Pollutant: string;
    Status: string;
    SO2: number;
    CO: number;
    CO_8hr: number;
    O3: number;
    O3_8hr: number;
    PM10: number;
    PM25: number;
    NO2: number;
    NOx: number;
    NO: number;
    WindSpeed: number;
    WindDirec: number;
    PublishTime: string;
    PM25AVG: number;
    PM10_AVG: number;
    SO2_AVG: number;
    Longitude: number;
    Latitude: number;
    SiteId: string;
    ImportDate: string;
}

export class Links {
    start: string;
    next: string;
}