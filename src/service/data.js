import { Account, Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import authService from "./auth";

class DataService {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appWriteEndpoint)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async getPostById(slug) {
        try {
            const result = await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
            return result;
        } catch (error) {
            console.error("appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async createPost(post) {
        const { title, content, featuredImage = "", status, slug, userId } = post
        const userId_ot = userId || (await authService.getLogInUser()).$id
        try {
            const result = await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId: userId_ot },
            );
            return result;
        } catch (error) {
            console.error("appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(post) {
        const { title, content, featuredImage, status, slug } = post
        try {
            const result = await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId: slug,
                data: { title, content, featuredImage, status },
            });
        } catch (error) {
            return false;
        }
        return true;
    }

    async getListOfPosts(query = [Query.equal("status", "active")]) {
        try {
            const result = await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query
            );
            return result.documents;
        } catch (error) {
            console.error("appwrite service :: getListOfPosts :: error", error);
            return [];
        }
    }

    async deletePost(slug) {
        try {
            const result = await this.databases.deleteDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId: slug,
            });
        } catch (error) {
            return false;
        }
        console.log(result);
        return true;
    }
}

const dataService = new DataService();
export default dataService;