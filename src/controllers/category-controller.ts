import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base-controller";
import { CategoryService } from "../services/category-service";

@route("/api/category")
export class CategoryController extends BaseController {
  /**
   * @param {CategoryService} categoryService: Inicializar propiedad.
   */
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @GET()
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.findAllAsync();
      res.status(200).json(categories);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @GET()
  async getCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.findById(id);
      if (!category)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json(category);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  async createCategory(req: Request, res: Response) {
    try {
      const result = await this.categoryService.createAsync(req.body);
      if (!result)
        return res.status(500).json({
          message: "Ocurrio un error al intentar guardar la información.",
        });
      res.status(200).json({ message: "Información insertada." });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @PUT()
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.categoryService.updateByIdAsync(id, req.body);
      if (!result)
        return res.status(500).json({
          message: "Ocurrio un error al intentar actualizar la información.",
        });
      res.status(200).json({ message: "Información actualizada." });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @DELETE()
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.categoryService.deleteByIdAsync(id);
      if (!result)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json({ message: "Registro eliminado." });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
