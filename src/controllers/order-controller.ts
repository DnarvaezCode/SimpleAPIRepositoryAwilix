import { CategoryService } from "./../services/category-service";
import { IOrderDetail } from "./../models/orderDetail-model";
import { OrderDetailService } from "./../services/orderDetail-service";
import { OrderService } from "./../services/order-service";
import { GET, POST, PUT, DELETE, route } from "awilix-express";
import { Request, Response } from "express";
import { BaseController } from "../common/controllers/base-controller";
import { UserService } from "../services/user-service";
import { ProductService } from "../services/product-service";

@route("/api/order")
export class OrderController extends BaseController {
  /**
   * @param {OrderService} orderService: Inicializar propiedad.
   * @param {OrderDetailService} orderDetailService: Inicializar propiedad.
   */
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService
  ) {
    super();
  }

  @GET()
  async getAllOrder(req: Request, res: Response) {
    try {
      const populateOptions = {
        path: "orderDetails",
        populate: { path: "product", populate: "category" },
      };
      const orders = await this.orderService.findAllAsync(
        "user",
        populateOptions
      );
      res.status(200).json(orders);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  async createOrder(req: Request, res: Response) {
    try {
      const orderItems = Promise.all(
        req.body.orderDetails.map(async (orderItem: IOrderDetail) => {
          const result = await this.orderDetailService.insertAsync(orderItem);
          return result.id;
        })
      );

      req.body.orderDetails = await orderItems;
      req.body.totalPrice = await this.getTotalPrice(await orderItems);

      const result = await this.orderService.createAsync(req.body);
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
  async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.orderService.updateByIdAsync(id, req.body);
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
  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await this.orderService.findById(id, "orderDetails");
      if (!order)
        return res.status(404).json({ message: "No se encontró el registro." });

      await this.orderService.deleteByIdAsync(id);
      order.orderDetails.map(async (item: any) => {
        const { id } = item;
        await this.orderDetailService.deleteByIdAsync(id);
      });

      res.status(200).json({ message: "Registro eliminado." });
    } catch (error) {
      this.handleException(error, res);
    }
  }

  async getTotalPrice(orderItems: any[]): Promise<Number> {
    const totalPrices = await Promise.all(
      orderItems.map(async (item) => {
        const orderDetail: any = await this.orderDetailService.findById(
          item.id,
          "product"
        );
        return orderDetail.product.price * orderDetail.quantity;
      })
    );

    return totalPrices.reduce((a, b) => a + b, 0);
  }
}
