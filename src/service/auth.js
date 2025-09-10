import { Account, Client } from "appwrite";
import conf from "../conf/conf";
import { nanoid } from "@reduxjs/toolkit";

class AuthSerive {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appWriteEndpoint)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(loginDetails) {
        const { emailId, password, name } = loginDetails
        try {
            const result = await this.account.create(
                nanoid(), // userId
                emailId, // email
                password, // password
                name // name (optional)
            );
            console.log(result)
            return true
        } catch (error) {
            console.error("Appwrite Service :: creating account :: error", error);
            return false;
        }
    }

    async login(loginDetails) {
        try {
            const { emailId, password, name } = loginDetails
            this.session = await this.account.createEmailPasswordSession(
                emailId,
                password,
                name
            );
            console.log(this.session)
            return true;
        } catch (error) {
            console.error("Appwrite Service :: Login :: error", error);
            return false;
        }
    }

    async getLogInUser() {
        const user = this.account.get()
        this.session = user.targets
        return user;
    }

    async logout() {
        try {
            const currSession = await this.account.getSession('current')
            await this.account.deleteSession(currSession.$id);
            return true;
        } catch (error) {
            console.log("appwrite service :: logout :: error", error)
            return false;
        }
    }
}

const authService = new AuthSerive();

export default authService;
