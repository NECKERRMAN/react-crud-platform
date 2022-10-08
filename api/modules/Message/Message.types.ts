import Office from '../Office/Office.entity';
import Property from '../Property/Property.entity';
import User from "../User/User.entity";

export interface MessageBody {
    content: string;
    isRead: boolean;
    userId: number;
    user?: User;
    propertyId: number;
    property?: Property;
    officeId: number;
    office?: Office;
}