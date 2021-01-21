import { DeviceType } from './device.type.enum';
import { Highlight } from './highlight.enum';
export class Product {
    name: string;
    brand: string;
    description: string;
    released: Date;
    price: number;
    display: string;
    battery: string;
    oS: string;
    storage: string;
    hardware: string;
    imagePath: string;
    type: DeviceType;
    camera?: string;
    highlight?: Highlight;
    available?: boolean;
    rating?: number[];

    constructor({ deviceName, deviceBrand, deviceDescription, deviceReleasedDate, devicePrice, deviceDisplay, deviceBattery, deviceOS, deviceStorage, deviceHardware, deviceImagePath, deviceType, deviceCamera, highlight, available, rating }: { deviceName: string; deviceBrand: string; deviceDescription: string; deviceReleasedDate: Date; devicePrice: number; deviceDisplay: string; deviceBattery: string; deviceOS: string; deviceStorage: string; deviceHardware: string; deviceImagePath: string; deviceType: DeviceType; deviceCamera: string; highlight: Highlight; available: boolean; rating?: number[]; }) {

        this.name = deviceName;
        this.brand = deviceBrand;
        this.description = deviceDescription;
        this.released = deviceReleasedDate;
        this.price = devicePrice;
        this.display = deviceDisplay;
        this.battery = deviceBattery;
        this.oS = deviceOS;
        this.storage = deviceStorage;
        this.hardware = deviceHardware;
        this.imagePath = deviceImagePath;
        this.type = deviceType;
        this.camera = deviceCamera;
        this.highlight = highlight;
        this.available = available;
        this.rating = rating;
    }
}