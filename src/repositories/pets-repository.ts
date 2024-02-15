import {
  Age,
  Energy,
  Independence,
  Pet,
  Prisma,
  Size,
  Type,
} from '@prisma/client'
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity(city: string, page: number): Promise<Pet[]>
  findManyByFilter(
    age?: Age,
    energy?: Energy,
    size?: Size,
    independence?: Independence,
    type?: Type,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
