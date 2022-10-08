import "reflect-metadata";
import { DataSource } from "typeorm";
import Category from '../modules/Category/Category.entity';
import City from '../modules/City/City.entity';
import Message from '../modules/Message/Message.entity';
import Office from '../modules/Office/Office.entity';
import Property from '../modules/Property/Property.entity';
import User from '../modules/User/User.entity';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Office, Property, User, City, Message, Category],
    migrations: [],
    subscribers: [],
    ...(process.env.ENV === "production"
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {}),
});