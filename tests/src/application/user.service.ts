import type { User } from "../domain/entities/user";
import type { IUserRepository } from "../domain/repositories/user.repository";

export class UserService {
    private readonly userRepository: IUserRepository

    constructor(props: { repository: IUserRepository }) {
        this.validateParams({ ...props });
        this.userRepository = props.repository
    }

    validateParams({ repository }: { repository: IUserRepository }) {
        if (!repository) {
            throw new Error('Repository cannot be null')
        }
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async save(user: User): Promise<void> {
        return this.userRepository.save(user);
    }
}