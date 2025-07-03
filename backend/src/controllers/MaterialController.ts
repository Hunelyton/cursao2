import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateMaterialService } from '../useCases/Material/CreateMaterial/CreateMaterialService.service'
import { ListMaterialsService } from '../useCases/Material/ListMaterials/ListMaterialsService.service'

export class MaterialController {
  async create(req: Request, res: Response): Promise<Response> {
    const { nome, disciplinaId } = req.body
    const service = container.resolve(CreateMaterialService)
    await service.execute({ nome, disciplinaId })
    return res.status(201).json({ success: true })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { disciplinaId } = req.query
    const service = container.resolve(ListMaterialsService)
    const materials = await service.execute(disciplinaId as string | undefined)
    return res.status(200).json({ success: true, items: materials })
  }
}
