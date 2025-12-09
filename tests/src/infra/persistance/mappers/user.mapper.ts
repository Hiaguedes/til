import { User } from "../../../domain/entities/user";
import { UserEntity } from "../entities/user.entity";

export class UserMapper {
    static toPersistanceEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.Id;
        userEntity.name = user.Name;
        return userEntity;
    }
    static toDomain(userEntity: UserEntity): User {
        return new User({ id: userEntity.id, name: userEntity.name });
    }
}