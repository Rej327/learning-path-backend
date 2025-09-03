import { v4 as uuidv4 } from 'uuid';

export interface Post {
    id: string;
    caption: string;
    fileUrl: string;
    type: 'image' | 'video';
}

interface UpdatePostData {
    caption?: string;
    fileUrl?: string;
    type?: 'image' | 'video';
}

const posts: Post[] = [];

export const createPost = (data: { caption?: string; fileUrl: string; type: 'image' | 'video' }): Post => {
    const post: Post = {
        id: uuidv4(),
        caption: data.caption || '',
        fileUrl: data.fileUrl,
        type: data.type,
    };
    posts.push(post);
    return post;
};

export const getAllPosts = (): Post[] => posts;

export const getPostById = (id: string): Post | undefined => posts.find(post => post.id === id);

export const updatePost = (id: string, data: UpdatePostData): Post | null => {
    const post = posts.find(p => p.id === id);
    if (!post) return null;

    // Update caption if provided
    if (typeof data.caption === 'string') post.caption = data.caption;

    // Update fileUrl/type if provided
    if (typeof data.fileUrl === 'string') post.fileUrl = data.fileUrl;
    if (data.type === 'image' || data.type === 'video') post.type = data.type;

    return post;
};

export const deletePost = (id: string): boolean => {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
};
