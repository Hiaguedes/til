import { describe, it, expect, beforeEach } from "vitest";
import { UserService } from "./user.service";
import { MockUserRepository } from "../../infra/repositories/user.repository.mock";
import { User } from "../../domain/entities/user";

describe("User Service", () => {

    let userService: UserService;
    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        mockUserRepository = new MockUserRepository();
        userService = new UserService({
            repository: mockUserRepository
        });
    });

    it.each([
        { param: 'repository', props: { repository: null }, errorMessage: 'Repository cannot be null' },
    ])
        ("should throw error if param $param is incorrect", ({ errorMessage, props: { repository } }) => {
            expect(() => {
                new UserService({ repository: repository as unknown as any });
            }).toThrowError(errorMessage);
        });

    it("should return null if an invalid id is provided", async () => {

        const user = await userService.findUserById("invalid-id");
        expect(user).toBeNull();
    });

    it("should return a user object if a valid id is provided", async () => {
        const user = await userService.findUserById("valid-id");
        expect(user).not.toBeNull();
        expect(user?.Id).toBe("valid-id");
        expect(user?.Name).toBe("John Doe");
    });

    it.each([
        { id: "id-1", name: "Alice Ko" },
        { id: "id-4", name: "User test" },
    ])("should save a new user correctly", async ({ id, name }) => {
        const newUser = new User({ id, name });
        await userService.save(newUser);
        const savedUser = await userService.findUserById(id);
        expect(savedUser).not.toBeNull();
        expect(savedUser?.Id).toBe(id);
        expect(savedUser?.Name).toBe(name);
    });
});