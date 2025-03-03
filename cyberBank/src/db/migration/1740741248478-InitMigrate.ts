import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigrate1740741248478 implements MigrationInterface {
    name = 'InitMigrate1740741248478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying(32) NOT NULL,
                "password" character varying(128) NOT NULL,
                "balance" integer NOT NULL,
                CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "description" character varying(300) NOT NULL,
                "content" character varying(300) NOT NULL,
                "price" integer NOT NULL,
                "image_path" character varying NOT NULL,
                "created" character varying NOT NULL,
                "updated" character varying,
                "ownerId" integer,
                CONSTRAINT "UQ_69e8391440e57f0f02aedc91b64" UNIQUE ("content"),
                CONSTRAINT "REL_cbb5d890de1519efa20c42bcd5" UNIQUE ("ownerId"),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "content" character varying(100) NOT NULL,
                "created" character varying NOT NULL,
                "userId" integer,
                "productId" integer,
                CONSTRAINT "REL_c0354a9a009d3bb45a08655ce3" UNIQUE ("userId"),
                CONSTRAINT "REL_1e9f24a68bd2dcd6390a400839" UNIQUE ("productId"),
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52"
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
