import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "../types/endpoint.type";

@Entity()
export class EndPoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  path: string;
  @Column("json", { array: true })
  requests: Request[];
  @Column()
  method: string;
  @Column()
  lastApiCall: number;
}
