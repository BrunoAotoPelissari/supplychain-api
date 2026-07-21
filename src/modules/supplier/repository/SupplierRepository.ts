import { prisma } from "../../../config/prisma";

export interface CreateSupplierDTO {
  name: string;
  contactEmail: string;
}

export interface UpdateSupplierDTO {
  name?: string;
  contactEmail?: string;
}

export class SupplierRepository {
  async findAll() {
    return prisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateSupplierDTO) {
    return prisma.supplier.create({
      data,
    });
  }

  async update(id: string, data: UpdateSupplierDTO) {
    return prisma.supplier.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.supplier.delete({
      where: {
        id,
      },
    });
  }
}