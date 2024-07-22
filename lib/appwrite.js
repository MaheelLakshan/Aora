import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.lakshan.aora',
  projectId: '669cb5a900160ce50c01',
  databaseId: '669cb8b70021070db2e8',
  userCollectionId: '669cb8ed00046c537802',
  videoCollectionId: '669cb932002aee82621f',
  storageId: '669cbce1000d26854feb',
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), { accountId: newAccount.$id, email, username, avatar: avatarUrl });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    // const currentSession = await account.getSession('current');
    // console.log(currentSession);
    // if (!currentSession) {
    // if (account.getSession()) {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
    // } else {
    // await account.deleteSession('');
    // const session = await account.createEmailPasswordSession(email, password);
    // return session;
    // }
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // console.log(currentAccount);
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal('accountId', currentAccount.$id)]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
