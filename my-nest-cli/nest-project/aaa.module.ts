/*
 * @Date: 2024-12-05 15:42:36
 * @Description: description
 */
//@ts-ignore
import { Module } from "@nestjs/common";
import { AaaController } from "./aaa.controller";

@Module({ controllers: [AaaController] })
export class AaaModule {}
