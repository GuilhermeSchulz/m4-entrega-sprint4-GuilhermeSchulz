import { MigrationInterface, QueryRunner } from "typeorm";

export class user1671044402668 implements MigrationInterface {
    name = 'user1671044402668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET NOT NULL`);
    }

}
