export class User {
    private readonly id: string
    private readonly name: string

    constructor(props: { id: string; name: string }) {
        this.validateParams({ ...props });
        this.id = props.id
        this.name = props.name
    }

    validateParams(props: { id: string; name: string }) {
        const { id, name } = props;
        if (!id) {
            throw new Error('ID cannot be empty')
        }
        if (!name) {
            throw new Error('Name cannot be empty')
        }
    }

    get Id() {
        return this.id
    }

    get Name() {
        return this.name
    }


}