import {Adapter} from "next-auth/adapters";
import {fixtures} from "./fixtures";

export interface TestOptions {
    adapter: Adapter
    fixtures?: {
        user?: any
        session?: any
        account?: any
        sessionUpdateExpires?: Date
        verificationTokenExpires?: Date
    },
    skipTests?: string[]
}

/**
 * A wrapper to run the most basic tests.
 * Run this at the top of your test file.
 * You can add additional tests below, if you wish.
 */
export async function runBasicTests(options: TestOptions) {
    const {adapter: _adapter, skipTests} = options
    const adapter = _adapter as Required<Adapter>

    // Init
    beforeAll(async () => {
        console.log('Tests', 'beforeAll')
    })

    afterAll(async () => {
        console.log('Tests', 'afterAll')
    })

    let user: any = options.fixtures?.user ?? {
        email: "fill@murray.com",
        image: "https://www.fillmurray.com/460/300",
        name: "Fill Murray",
        emailVerified: new Date()
    }

    // All adapters must define these methods
    test("Required (User, Account, Session) methods exist", () => {
        const requiredMethods = [
            "createUser",
            "getUser",
            "getUserByEmail",
            "getUserByAccount",
            "updateUser",
            "linkAccount",
            "createSession",
            "getSessionAndUser",
            "updateSession",
            "deleteSession",
        ]
        requiredMethods.forEach((method) => {
            expect(adapter).toHaveProperty(method)
        })
    })

    test("createUser", async () => {
        const result = await adapter.createUser(user)
        console.log('tests', 'createUser', result)
        expect(result.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        expect(result.email).toMatch(fixtures.user.email)
    })

    test("getUserByEmail", async () => {
        const result = await adapter.getUserByEmail(fixtures.user.email);
    })
}
