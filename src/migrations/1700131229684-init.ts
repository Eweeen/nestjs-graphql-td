import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700131229684 implements MigrationInterface {
    name = 'Init1700131229684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`type_apartments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`syndics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`common_equipments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`building_equipments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_building\` int NULL, \`id_equipment\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`buildings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nb_floors\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`zip\` varchar(5) NOT NULL, \`city\` varchar(255) NOT NULL, \`syndic_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tenants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tenant_main\` tinyint NOT NULL, \`apartment_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`persons\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`birthdate\` date NOT NULL, \`owner_id\` int NULL, \`tenant_id\` int NULL, UNIQUE INDEX \`REL_37e26decb779efbc1735704495\` (\`owner_id\`), UNIQUE INDEX \`REL_3531703a6fd66767c18c09e92e\` (\`tenant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`owners\` (\`id\` int NOT NULL AUTO_INCREMENT, \`account_number\` int NOT NULL, \`is_subject_to_tva\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`apartments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nb_rooms\` int NOT NULL, \`nb_tenants_max\` int NOT NULL, \`price\` int NOT NULL, \`type_id\` int NULL, \`building_id\` int NULL, \`owner_id\` int NULL, \`tenant_main_id\` int NULL, UNIQUE INDEX \`REL_987d55dd6a766f2a3a587391a2\` (\`tenant_main_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`apartment_options\` (\`id_apartment\` int NOT NULL, \`id_option\` int NOT NULL, PRIMARY KEY (\`id_apartment\`, \`id_option\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`building_equipments\` ADD CONSTRAINT \`FK_6eee6febe342cefb1ad736538f4\` FOREIGN KEY (\`id_building\`) REFERENCES \`buildings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`building_equipments\` ADD CONSTRAINT \`FK_ca6b54ebfb1ab861644b34a30ba\` FOREIGN KEY (\`id_equipment\`) REFERENCES \`common_equipments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`buildings\` ADD CONSTRAINT \`FK_d5914ee8cc364f00f3313e5c580\` FOREIGN KEY (\`syndic_id\`) REFERENCES \`syndics\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tenants\` ADD CONSTRAINT \`FK_cf5b3c0a11d2005cb3a54edee44\` FOREIGN KEY (\`apartment_id\`) REFERENCES \`apartments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`persons\` ADD CONSTRAINT \`FK_37e26decb779efbc17357044953\` FOREIGN KEY (\`owner_id\`) REFERENCES \`owners\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`persons\` ADD CONSTRAINT \`FK_3531703a6fd66767c18c09e92e2\` FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartments\` ADD CONSTRAINT \`FK_218d026176e7e21662198eee87d\` FOREIGN KEY (\`type_id\`) REFERENCES \`type_apartments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartments\` ADD CONSTRAINT \`FK_ea42a4fe9d90b4885bc87ba6dc3\` FOREIGN KEY (\`building_id\`) REFERENCES \`buildings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartments\` ADD CONSTRAINT \`FK_6f2c244007aaf02abcd68cf121c\` FOREIGN KEY (\`owner_id\`) REFERENCES \`owners\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartments\` ADD CONSTRAINT \`FK_987d55dd6a766f2a3a587391a20\` FOREIGN KEY (\`tenant_main_id\`) REFERENCES \`tenants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartment_options\` ADD CONSTRAINT \`FK_7f32c7be17445f14336a74ae593\` FOREIGN KEY (\`id_apartment\`) REFERENCES \`apartments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apartment_options\` ADD CONSTRAINT \`FK_145e531d5818f4add90c4d46d1a\` FOREIGN KEY (\`id_option\`) REFERENCES \`options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`apartment_options\` DROP FOREIGN KEY \`FK_145e531d5818f4add90c4d46d1a\``);
        await queryRunner.query(`ALTER TABLE \`apartment_options\` DROP FOREIGN KEY \`FK_7f32c7be17445f14336a74ae593\``);
        await queryRunner.query(`ALTER TABLE \`apartments\` DROP FOREIGN KEY \`FK_987d55dd6a766f2a3a587391a20\``);
        await queryRunner.query(`ALTER TABLE \`apartments\` DROP FOREIGN KEY \`FK_6f2c244007aaf02abcd68cf121c\``);
        await queryRunner.query(`ALTER TABLE \`apartments\` DROP FOREIGN KEY \`FK_ea42a4fe9d90b4885bc87ba6dc3\``);
        await queryRunner.query(`ALTER TABLE \`apartments\` DROP FOREIGN KEY \`FK_218d026176e7e21662198eee87d\``);
        await queryRunner.query(`ALTER TABLE \`persons\` DROP FOREIGN KEY \`FK_3531703a6fd66767c18c09e92e2\``);
        await queryRunner.query(`ALTER TABLE \`persons\` DROP FOREIGN KEY \`FK_37e26decb779efbc17357044953\``);
        await queryRunner.query(`ALTER TABLE \`tenants\` DROP FOREIGN KEY \`FK_cf5b3c0a11d2005cb3a54edee44\``);
        await queryRunner.query(`ALTER TABLE \`buildings\` DROP FOREIGN KEY \`FK_d5914ee8cc364f00f3313e5c580\``);
        await queryRunner.query(`ALTER TABLE \`building_equipments\` DROP FOREIGN KEY \`FK_ca6b54ebfb1ab861644b34a30ba\``);
        await queryRunner.query(`ALTER TABLE \`building_equipments\` DROP FOREIGN KEY \`FK_6eee6febe342cefb1ad736538f4\``);
        await queryRunner.query(`DROP TABLE \`apartment_options\``);
        await queryRunner.query(`DROP TABLE \`options\``);
        await queryRunner.query(`DROP INDEX \`REL_987d55dd6a766f2a3a587391a2\` ON \`apartments\``);
        await queryRunner.query(`DROP TABLE \`apartments\``);
        await queryRunner.query(`DROP TABLE \`owners\``);
        await queryRunner.query(`DROP INDEX \`REL_3531703a6fd66767c18c09e92e\` ON \`persons\``);
        await queryRunner.query(`DROP INDEX \`REL_37e26decb779efbc1735704495\` ON \`persons\``);
        await queryRunner.query(`DROP TABLE \`persons\``);
        await queryRunner.query(`DROP TABLE \`tenants\``);
        await queryRunner.query(`DROP TABLE \`buildings\``);
        await queryRunner.query(`DROP TABLE \`building_equipments\``);
        await queryRunner.query(`DROP TABLE \`common_equipments\``);
        await queryRunner.query(`DROP TABLE \`syndics\``);
        await queryRunner.query(`DROP TABLE \`type_apartments\``);
    }

}
