import { Repository } from 'typeorm';
import { CommonEquipment } from '../../common-equipments/common-equipment.entity';

export async function seedCommonEquipments(
  commonEquipmentsRepository: Repository<CommonEquipment>,
): Promise<void> {
  const commonEquipments: Promise<any>[] = [
    commonEquipmentsRepository.save({
      id: 1,
      name: 'Ascenseur',
    }),
    commonEquipmentsRepository.save({
      id: 2,
      name: 'Parc',
    }),
    commonEquipmentsRepository.save({
      id: 3,
      name: 'Hall',
    }),
    commonEquipmentsRepository.save({
      id: 4,
      name: 'Conciergerie',
    }),
  ];

  await Promise.all(commonEquipments);
}
