import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import {
    IsInt,
    Length,
    IsEmail,
    Min,
    Max
} from "class-validator"
import { hash } from "bcrypt"
import { SALT_ROUNDS } from "../contants"

enum Security {
    SSL = 'SSL',
    TLS = 'TLS',
    NONE = 'None',
}


@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 30,
        type: "varchar"
    })
    @Length(3, 30)
    name: string

    @Column({
        length: 320,
        type: "varchar"
    })
    @IsEmail()
    email: string

    @Column({
        unique: true,
        length: 30,
        type: "varchar"
    })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: "varchar",
        length: "320"
    })
    smtpHost: string

    @Column({
        type: "int"
    })
    @IsInt()
    @Min(0)
    @Max(65536)
    smtpPort: number

    @Column({
        type: "int"
    })
    @Min(0)
    @Max(40000)
    messagePerDay: number

    @Column({
        type: 'enum', enum: Security, default: Security.SSL
    })
    smtpSecurity: Security

    @Column({
        type: "int"
    })
    @Min(0)
    @Max(1000)
    minimumTimeGap: number

    @Column({
        type: "boolean"
    })
    differnetReplyAddress: boolean

    @Column({
        type: "varchar",
        length: "320"
    })
    imapHost: string

    @Column()
    @IsInt()
    @Min(0)
    @Max(65536)
    imapPort: number

    @Column({
        type: 'enum', enum: Security, default: Security.SSL
    })
    imapSecurity: Security

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    // Hash passwprd before save
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, SALT_ROUNDS);
    }
}
