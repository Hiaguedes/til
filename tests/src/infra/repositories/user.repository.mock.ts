import { User } from "../../domain/entities/user"
import type { IUserRepository } from "../../domain/repositories/user.repository";

export class MockUserRepository implements IUserRepository {
    private users: User[] = [
        new User({ id: "valid-id", name: "John Doe" }),
        new User({ id: "2", name: "Jane Smith" }),
    ];

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.Id === id) || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}