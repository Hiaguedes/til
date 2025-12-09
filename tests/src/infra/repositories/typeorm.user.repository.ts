import type { Repository } from "typeorm";
import type { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistance/entities/user.entity";

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
        return new User({ id: userEntity.id, name: userEntity.name });
    }

    async save(user: User): Promise<void> {
        const userEntity = new UserEntity();
        userEntity.id = user.Id;
        userEntity.name = user.Name;

        await this.repository.save(userEntity);
    }
}