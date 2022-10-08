import Office from '../Office/Office.entity';
import { UserRole } from './User.constants';

export interface UserBody {
    name: string;
    surname: string;
    phone: string;
    email: string;
    officeId?: number;
    office?: Office;
    role?: UserRole;
}
