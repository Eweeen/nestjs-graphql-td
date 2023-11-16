import { Repository } from 'typeorm';
import { TypeApartment } from '../../type-apartments/type-apartment.entity';

export async function seedTypeApartments(
  typeApartmentsRepository: Repository<TypeApartment>,
): Promise<void> {
  const typeApartments: Promise<any>[] = [
    typeApartmentsRepository.save({
      id: 1,
      name: 'Studio',
    }),
    typeApartmentsRepository.save({
      id: 2,
      name: 'T2',
    }),
    typeApartmentsRepository.save({
      id: 3,
      name: 'T3',
    }),
  ];

  await Promise.all(typeApartments);
}
