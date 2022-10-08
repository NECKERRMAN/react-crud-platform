import Category from '../Category/Category.entity';
import City from '../City/City.entity';
import Office from '../Office/Office.entity';

export interface PropertyBody {
    adress: string;
    cityId: number;
    city?: City;
    categoryId: number;
    category?: Category;
    officeId: number;
    office?: Office;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    buyOrRent: number;
    propertyImage?: string | null;
}
