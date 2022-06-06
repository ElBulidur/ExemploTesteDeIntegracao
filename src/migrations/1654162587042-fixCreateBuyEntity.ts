import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCreateBuyEntity1654162587042 implements MigrationInterface {
    name = 'fixCreateBuyEntity1654162587042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_73b6d9b1037a714d3314e038819" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_73b6d9b1037a714d3314e038819"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP COLUMN "userId"`);
    }

}
