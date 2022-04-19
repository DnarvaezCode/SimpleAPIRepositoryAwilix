import { Model } from "mongoose";
import { ProductService } from "./services/product-service";
import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { BrandService } from "./services/brand-service";
import { CategoryService } from "./services/category-service";
import { UserService } from "./services/user-service";
import { OrderService } from "./services/order-service";
import { OrderDetailService } from "./services/orderDetail-service";

export default (app: Application): void => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    productService: asClass(ProductService).scoped(),
    brandService: asClass(BrandService).scoped(),
    categoryService: asClass(CategoryService).scoped(),
    userService: asClass(UserService).scoped(),
    orderService: asClass(OrderService).scoped(),
    orderDetailService: asClass(OrderDetailService).scoped(),
  });

  app.use(scopePerRequest(container));
};
