import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base-controller";
import { removeFile, uploadImage, removeImage } from "../config/cloudinary";
import { BrandService } from "../services/brand-service";
import { CategoryService } from "../services/category-service";
import { ProductService } from "../services/product-service";

@route("/api/product")
export class ProductController extends BaseController {
  /**
   * @param {ProductService} productService: Inicializar propiedad.
   * @param {BrandService} brandService: Inicializar propiedad.
   * @param {CategoryService} categoryService: Inicializar propiedad.
   */
  constructor(
    private readonly productService: ProductService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService
  ) {
    super();
  }

  @GET()
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.findAllAsync("category brand");
      res.status(200).json(products);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route("/:id")
  @GET()
  async getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(id, "category brand");
      if (!product)
        return res.status(404).json({ message: "No se encontró el registro." });
      res.status(200).json(product);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  async createProduct(req: Request, res: Response) {
    try {
      const category = await this.categoryService.findById(req.body.category);
      if (!category)
        return res
          .status(404)
          .json({ message: "No se encontró la categoria." });

      const brand = await this.brandService.findById(req.body.brand);
      if (!brand)
        return res.status(404).json({ message: "No se encontró la marca." });

      if (req?.files?.image) {
        const { image } = req.files;
        const fileResult = await uploadImage(image);
        removeFile(image);
        req.body.image = {
          public_id: fileResult.public_id,
          url: fileResult.url,
        };
      }

      const result = await this.productService.createAsync(req.body);
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
  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.productService.updateByIdAsync(id, req.body);
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
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(id);
      if (!product)
        return res.status(404).json({ message: "No se encontró el producto." });

      if (product?.image) {
        await removeImage(product.image);
      }

      await this.productService.deleteByIdAsync(id);

      res.status(200).json({ message: "Registro eliminado." });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
