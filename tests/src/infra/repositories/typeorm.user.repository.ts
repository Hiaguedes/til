import type { Repository } from "typeorm";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistance/entities/user.entity";
import { UserMapper } from "../persistance/mappers/user.mapper";

export class TypeORMUserRepository implements IUserRepository {
    private readonly repository: Repository<UserEntity>;

    constructor(props: { repository: Repository<UserEntity> }) {
        this.validateParams(props);
        this.repository = props.repository;
    }

    validateParams(props: { repository: Repository<UserEntity> }): void {
        if (!props.repository) {
            throw new Error("Repository cannot be null");
        }
    }

    async findById(id: string): Promise<User | null> {
        const userEntity = await this.repository.findOne({ where: { id } });
        if (!userEntity) {
            return null;
        }
        return UserMapper.toDomain(userEntity);
    }

    async save(user: User): Promise<void> {
        const userEntity = UserMapper.toPersistanceEntity(user);

        await this.repository.save(userEntity);
    }
}