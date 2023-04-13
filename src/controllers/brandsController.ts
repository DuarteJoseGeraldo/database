import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type Brand = {
  id?: number;
  name: string;
  country: string;
};
