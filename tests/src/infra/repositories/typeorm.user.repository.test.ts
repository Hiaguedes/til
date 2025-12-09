import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { User } from "../../domain/entities/user";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../persistance/entities/user.entity";
import { TypeORMUserRepository } from "./typeorm.user.repository";

describe('TypeORM User Repository', () => {
    let dataSource: DataSource;
    let userRepository: TypeORMUserRepository;
    let ormRepository: Repository<UserEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            synchronize: true,
            entities: [UserEntity],
            logging: false,
        });

        await dataSource.initialize();
        ormRepository = dataSource.getRepository(UserEntity);
        userRepository = new TypeORMUserRepository({ repository: ormRepository });

    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it('should save user', async () => {
        const user = new User({ id: "new-id", name: "Alice Johnson" });

        await userRepository.save(user);

        const retrievedUser = await ormRepository.findOne({ where: { id: "new-id" } });
        expect(retrievedUser).not.toBeNull();
        expect(retrievedUser?.name).toBe("Alice Johnson");
    });

    it('should find user by id', async () => {
        const userEntity = new UserEntity();
        userEntity.id = "1";
        userEntity.name = "Bob Brown";
        await ormRepository.save(userEntity);
        const user = await userRepository.findById("1");

        expect(user).not.toBeNull();
        expect(user?.Id).toBe("1");
        expect(user?.Name).toBe("Bob Brown");
    });

    it('should return null if user not found', async () => {
        const user = await userRepository.findById("non-existing-id");
        expect(user).toBeNull();
    });
});