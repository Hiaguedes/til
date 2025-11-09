import { describe, it, expect } from "vitest";
import { User } from "./user";

describe("User Entity", () => {
    it("should create a instance of user with id and name", () => {

        const user = new User({
            id: "user-1",
            name: "John Doe",
        });

        expect(user).toBeInstanceOf(User);
        expect(user.Id).toBe("user-1");
        expect(user.Name).toBe("John Doe");
    });

    it('should thrown error if id is empty', () => {
        expect(() => {
            new User({
                id: '',
                name: 'John Doe',
            });
        }).toThrowError('ID cannot be empty');
    });

    it('should thrown error if name is empty', () => {
        expect(() => {
            new User({
                id: 'user-1',
                name: '',
            });
        }).toThrowError('Name cannot be empty');
    });
});