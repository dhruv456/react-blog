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
        const result = await this.account.create(
            nanoid(), // userId
            emailId, // email
            password, // password
            name // name (optional)
        );
        console.log(result)
    }

    async login(loginDetails) {
        const { emailId, password, name } = loginDetails
        this.session = await this.account.createEmailPasswordSession(
            emailId,
            password,
            name
        );
        console.log(this.session)
    }
    async GetLogInUser() {
        const user = this.account.get()
        return user;
    }
}

const authService = new AuthSerive();

export default authService;
