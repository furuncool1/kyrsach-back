import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class createTableUser1653115050419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"user",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:'name',
                        type:'varchar',
                    },
                    {
                        name:'email',
                        isUnique:true,
                        type:'varchar',
                    },
                    {
                        name:'password',
                        type:'varchar',
                    },
                ]
            }),
        );

        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_USER_NAME",
                columnNames: ["name"],
            }),
        )
            
        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_USER_EMAIL",
                columnNames: ["email"],
            }),
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('user');
    }

}
