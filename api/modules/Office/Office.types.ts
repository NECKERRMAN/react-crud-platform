import City from '../City/City.entity';

export interface OfficeBody {
    name: string;
    contactEmail: string;
    contactName: string;
    cityId: number;
    city?: City;
    street?: string;
    officeImage?: string | null;
}
