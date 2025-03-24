// /models/user.ts

export default class UserClass {
    id: string;
    username: string;
    email: string;
    password: string;
    contact?: string;
    gender?: string;
    dateOfBirth?: string;
    bio?: string;

    constructor(
        id: string,
        username: string,
        email: string,
        password: string,
        contact?: string,
        gender?: string,
        dateOfBirth?: string,
        bio?: string
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.bio = bio;
    }

    // Method to convert the instance to JSON
    toJson(): object {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            contact: this.contact,
            gender: this.gender,
            dateOfBirth: this.dateOfBirth,
            bio: this.bio,
        };
    }

    // Static method to create an instance from JSON
    static fromJson(json: any): UserClass {
        return new UserClass(
            json.id,
            json.username,
            json.email,
            json.password,
            json.contact,
            json.gender,
            json.dateOfBirth,
            json.bio
        );
    }
}
