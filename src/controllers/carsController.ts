import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type Car = {
  id?: number;
  name: string;
  model: string;
  brand_id: number;
};

const index = async (req: Request, res: Response) => {
  try {
    const cars: Car[] = await knexInstance("cars")
      .select("cars.name", "cars.model", "brands.name as brand")
      .join("brands", "brands.id", "=", "cars.brand_id");

    res.status(200).json(cars);
  } catch (error) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const car: Car[] = await knexInstance("cars")
      .select("cars.name", "cars.model", "brands.name as brand")
      .join("brands", "brands.id", "=", "cars.brand_id")
      .where({ "cars.id": id });

    if (!car.length) throw new Error("Esse carro não existe");

    res.status(200).json(car[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name, model, brand } = req.body;

    const findBrand = await knexInstance("brands")
      .select("id")
      .where({ name: brand });

    const id: number[] = await knexInstance("books").insert({
      //insert retorna o id dos inseridos
      name,
      author_id: findBrand[0].id,
    });

    res.status(201).json({ id: id[0], name, model, brand });
  } catch (error) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, model, brand } = req.body;
    const updateData: any = { name, model }; //dados atualizados
    if (brand) {
      const brandData = await knexInstance("brands")
        .select("id") //seleciona o id porque precisa atualizar o id da fabricante no carro
        .where({ name: brand });

      if (!brandData[0]) {
        throw new Error("Fabricante não existe");
      }
      updateData.brand_id = brandData[0].id;
    }

    await knexInstance("cars").update(updateData).where({ id });

    res.status(200).json({ name, model, brand });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const car = await knexInstance("books").delete().where({ id });

    if (!car) throw new Error("Esse carro não existe");

    res.status(200).json({ msg: "carro deletado" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };
