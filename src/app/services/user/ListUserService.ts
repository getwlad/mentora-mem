import { Op, Order, OrderItem } from "sequelize";
import { parseISO } from "date-fns";
import User from "../../models/UserModel";
class ListUserService {
  async list(
    email: string,
    createdBefore: string,
    createdAfter: string,
    updatedBefore: string,
    updatedAfter: string,
    sort: string,
    page: number,
    limit: number,
    where: {},
    order: Order
  ) {
    if (email) {
      where = {
        ...where,
        email: {
          [Op.like]: email,
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        created_at: {
          [Op.lte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        created_at: {
          [Op.gte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updated_at: {
          [Op.lte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updated_at: {
          [Op.gte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":") as OrderItem);
    }
    try {
      const data: User[] = await User.findAll({
        attributes: { exclude: ["password_hash"] },
        where,
        order,
        limit,
        offset: limit * page - limit,
      });

      return data;
    } catch (err: any) {
      return { erro: err.message };
    }
  }
}

export default new ListUserService();
