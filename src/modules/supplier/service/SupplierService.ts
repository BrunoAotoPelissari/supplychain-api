import {
  SupplierRepository,
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from "../repository/SupplierRepository";

export class SupplierService {
  constructor(
    private supplierRepository = new SupplierRepository()
  ) {}

  async list() {
    return this.supplierRepository.findAll();
  }

  async getById(id: string) {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new Error("Fornecedor não encontrado");
    }

    return supplier;
  }

  async create(data: CreateSupplierDTO) {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error("O nome do fornecedor deve possuir pelo menos 3 caracteres.");
    }

    if (!data.contactEmail) {
      throw new Error("O e-mail é obrigatório.");
    }

    return this.supplierRepository.create(data);
  }

  async update(id: string, data: UpdateSupplierDTO) {
    await this.getById(id);

    return this.supplierRepository.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    return this.supplierRepository.delete(id);
  }
}