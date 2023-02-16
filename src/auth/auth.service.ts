import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService
    ) { }
    private prisma: PrismaClient = new PrismaClient();

    async login(email: string, password: string): Promise<any> {
        let checkEmail = await this.prisma.users.findFirst({
            where: {
                email
            }
        })
        const isMatch = await bcrypt.compare(password, checkEmail.password);
        if (checkEmail) {


            if (isMatch) {
                let token = this.jwt.sign(checkEmail, { expiresIn: "2d", secret: this.config.get("SECRET_KEY") })
                return {
                    check: true,
                    data: token
                }
            } else {
                return {
                    check: false,
                    data: "Wrong Password!"
                }
            }
        } else {
            return {
                check: false,
                data: "Wrong Email"
            }
        }
    }

    async signUp(email: string, password: string, phone: string, name: string, birthday: string, gender: string): Promise<any> {
        let passWordHash = bcrypt.hashSync(password, 10);
        let checkEmail = await this.prisma.users.findFirst({
            where: {
                email
            }
        })
        if (checkEmail) {
            return {
                check: false,
                data: "Email already exists!"
            }
        } else {
            let data = await this.prisma.users.create({
                data: {
                    email,
                    password: passWordHash,
                    phone,
                    name,
                    birthday,
                    gender,
                }
            })
            return {
                check: true,
                data
            }
        }

    }
}
