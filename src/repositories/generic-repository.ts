import { model, Model, models, Schema, PopulateOptions } from "mongoose";
import { IGeneryRespository } from "./interfaces/interface-genery-repository";

export class GenericRepository<T> implements IGeneryRespository<T> {
  private readonly _model: Model<T>;
  /**
   * @param {string} colletionName: Nombre de la colleción en tiempo de ejecución.
   * @param {Schema} schema: Nombre del schema si no existe se crea.
   */
  constructor(colletionName: string, schema: Schema) {
    this._model = models[colletionName] || model(colletionName, schema);
  }

  /**
   * Método para obtener todos los registro de una entidad de tipo T.
   * @param {string} entityName: Nombre de la entidad para realizar el join.
   * @return {T[]} Retorna un array de tipo T.
   */
  async findAllAsync(
    entityName: string = "",
    populateOptions: any = ""
  ): Promise<T[]> {
    return await this._model
      .find<T>({})
      .populate(entityName)
      .populate(populateOptions);
  }

  /**
   * Método para obtener un registro de tipo T por Id.
   * @param {string} id: Id a filtrar.
   * @param {string} entityName: Nombre de la entidad para realizar el join.
   * @return {T | null} Retorna un objeto de tipo T o null.
   */
  async findById(id: string, entityName: string = ""): Promise<T | null> {
    const result = await this._model.findById<T>(id).populate(entityName);
    if (!result) return null;
    return result as T;
  }

  /**
   * Método para obtener un registro de tipo T por Id.
   * @param {Object} filter: filtro.
   * @return {T | null} Retorna un objeto de tipo T o null.
   */
  async findOne(filter: Object): Promise<T | null> {
    const result = await this._model.findOne<T>(filter);
    if (!result) return null;
    return result as T;
  }

  /**
   * Método para insertar un objeto de tipo T.
   * @param {T} item: Objeto de tipo T a insertar.
   * @return {boolean} Retorna vardadero si la inserción fue exitosa de lo contrario false.
   */
  async createAsync(item: T): Promise<boolean> {
    const entity = new this._model<T>(item);
    const result = await entity.save();
    if (result) return true;
    return false;
  }

  /**
   * Método para insertar un objeto de tipo T.
   * @param {T} item: Objeto de tipo T a insertar.
   * @return {T} Retorna el objeto creado.
   */
  async insertAsync(item: T): Promise<T> {
    const entity = new this._model<T>(item);
    await entity.save();
    return entity;
  }

  /**
   * Método para actualizar un objeto de tipo T.
   * @param {string} id: Id a filtrar.
   * @param {string} item: Objeto de tipo T a actualizar.
   * @return {boolean} Retorna vardadero si la actualización fue exitosa de lo contrario false.
   */
  async updateByIdAsync(id: string, item: T): Promise<boolean> {
    const result = await this._model.findByIdAndUpdate<T>(id, item);
    if (!result) return false;
    return true;
  }

  /**
   * Método para eliminar un objeto de tipo T por Id.
   * @param {string} id: Id a filtrar.
   * @return {boolean} Retorna vardadero si la eliminación fue exitosa de lo contrario false.
   */
  async deleteByIdAsync(id: string): Promise<boolean> {
    const result = await this._model.findByIdAndDelete<T>(id);
    if (result) return true;
    return false;
  }
}
