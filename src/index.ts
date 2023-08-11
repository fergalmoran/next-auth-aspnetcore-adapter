import {type AdapterUser, type Adapter} from "next-auth/adapters";
import {fixtures} from "../tests/fixtures";

export function AspNetIdentityAdapter(baseUrl: string): Adapter {
    return {
        async createUser(data: AdapterUser) {
            const url = `${baseUrl}/register`;
            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: fixtures.user.username,
                    email: fixtures.user.email,
                    password: fixtures.user.password
                }),
            });
            if (result.status === 200) {
                //TODO: register endpoint should return more than a 200
                return {
                    id: '1409b076-296d-481e-9f52-1996b8002d9c',
                    username: data.name,
                    email: data.email,
                    emailVerified: new Date()
                } as AdapterUser;
            } else {
                const body = await result.json()
                if (result.status === 400) {
                    console.log("authService", "registerUser", body);
                }
                throw Error(`Unable to create user: result ${body}`);
            }
        },
        async getUser(id) {
            throw Error(`Not implemented`);
        },
        async getUserByEmail(email) {
            throw Error(`Not implemented`);
        },
        async getUserByAccount({providerAccountId, provider}) {
            throw Error(`Not implemented`);
        },
        async updateUser(user) {
            throw Error(`Not implemented`);
        },
        async deleteUser(userId) {
            throw Error(`Not implemented`);
        },
        async linkAccount(account) {
            throw Error(`Not implemented`);
        },
        async unlinkAccount({providerAccountId, provider}) {
            throw Error(`Not implemented`);
        },
        async createSession({sessionToken, userId, expires}) {
            throw Error(`Not implemented`);
        },
        async getSessionAndUser(sessionToken) {
            throw Error(`Not implemented`);
        },
        async updateSession({sessionToken}) {
            throw Error(`Not implemented`);
        },
        async deleteSession(sessionToken) {
            throw Error(`Not implemented`);
        },
        async createVerificationToken({identifier, expires, token}) {
            throw Error(`Not implemented`);
        },
        async useVerificationToken({identifier, token}) {
            throw Error(`Not implemented`);
        },
    };
}
