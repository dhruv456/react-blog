import { Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

class DataService {
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appWriteEndpoint)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(client);
    }

    async createPost(post) {
        const { title, content, featuredImage, status, slug, userId } = post
        try {
            const result = await this.databases.createDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId: slug,
                data: { title, content, featuredImage, status, userId },
            });
        } catch (error) {
            return false;
        }
        return true;
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
            const result = await this.databases.listDocuments({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                queries: query,
            });
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