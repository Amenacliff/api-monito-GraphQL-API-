import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { v4 as uniqueId } from "uuid";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(passwordHash: string, emailAddress: string): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUserHashedId = uniqueId();
        await this.userRepository.insert({
          apiKey: uniqueId(),
          emailAddress: emailAddress,
          hashUserId: newUserHashedId,
          projects: [],
          passwordHash: passwordHash,
          timeZone: "",
        });

        resolve(newUserHashedId);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  }

  async findOneById(hashedId: string): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const userObject = await this.userRepository.findOne({
          where: {
            hashUserId: hashedId,
          },
        });
        resolve(userObject);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  }

  async findOneByEmail(emailAddress: string): Promise<User | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const userObject = await this.userRepository.findOne({
          where: {
            emailAddress: emailAddress,
          },
        });
        resolve(userObject);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  }

  async getAllUsers(): Promise<User[] | null> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setUserPassword(newPasswordHash: string, userId: string): Promise<boolean> {
    try {
      await this.userRepository.update(
        {
          hashUserId: userId,
        },
        {
          passwordHash: newPasswordHash,
        },
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
