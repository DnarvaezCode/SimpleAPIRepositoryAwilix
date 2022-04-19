import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base-controller";
import { BrandService } from "../services/brand-service";

@route("/api/brand")
export class BrandController extends BaseController {
  /**
   * @param {BrandService} brandService: Inicializar propiedad.
   */
  constructor(private readonly brandService: BrandService) {
    super();
  }

  @GET()
  async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await this.brandService.findAllAsync();
      res.status(200).json(brands);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @GET()
  async getBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const brand = await this.brandService.findById(id);
      if (!brand)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json(brand);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  async createBrand(req: Request, res: Response) {
    try {
      const result = await this.brandService.createAsync(req.body);
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
  async updateBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.brandService.updateByIdAsync(id, req.body);
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
  async deleteBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.brandService.deleteByIdAsync(id);
      if (!result)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json({ message: "Registro eliminado." });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
