import { Op, Order, OrderItem } from "sequelize";
import Student from "../../models/StudentModel";
import InterestArea from "../../models/InterestAreaModel";
import { parseISO } from "date-fns";
class ListStudentService {
  async list(
    name: string,
    phone: string,
    cpf: string,
    points: number,
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
    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]: name,
        },
      };
    }
    if (phone) {
      where = {
        ...where,
        phone: {
          [Op.like]: phone,
        },
      };
    }
    if (cpf) {
      where = {
        ...where,
        cpf: {
          [Op.like]: cpf,
        },
      };
    }
    if (points) {
      where = {
        ...where,
        points: {
          [Op.like]: points,
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

    const data: Student[] = await Student.findAll({
      where,
      include: [
        {
          model: InterestArea,
          as: "interests",
          through: {
            attributes: [],
          },
          attributes: ["mentoring_area"],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return data;
  }
}

export default new ListStudentService();
