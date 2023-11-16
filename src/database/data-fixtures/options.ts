import { Repository } from 'typeorm';
import { Option } from '../../options/option.entity';

export async function seedOptions(
  optionsRepository: Repository<Option>,
): Promise<void> {
  const options: Promise<any>[] = [
    optionsRepository.save({
      id: 1,
      name: 'Balcon',
    }),
    optionsRepository.save({
      id: 2,
      name: 'Cave privative',
    }),
    optionsRepository.save({
      id: 3,
      name: 'Place de parking',
    }),
  ];

  await Promise.all(options);
}
