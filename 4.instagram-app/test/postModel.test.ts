import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/postModel';

describe('Post Model', () => {
    let postId: string;

    it('should create a post', () => {
        const post = createPost({ caption: 'Hello', fileUrl: '/uploads/test.jpg', type: 'image' });
        expect(post).toHaveProperty('id');
        expect(post.caption).toBe('Hello');
        postId = post.id;
    });

    it('should return all posts', () => {
        const posts = getAllPosts();
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);
    });

    it('should get post by ID', () => {
        const post = getPostById(postId);
        expect(post?.id).toBe(postId);
    });

    it('should return undefined for non-existent post', () => {
        const post = getPostById('fake-id');
        expect(post).toBeUndefined();
    });

    it('should update post caption', () => {
        const updated = updatePost(postId, { caption: 'Updated' });
        expect(updated?.caption).toBe('Updated');
    });

    it('should update fileUrl/type', () => {
        const updated = updatePost(postId, { fileUrl: '/uploads/new.jpg', type: 'video' });
        expect(updated?.fileUrl).toBe('/uploads/new.jpg');
        expect(updated?.type).toBe('video');
    });

    it('should return null when updating non-existent post', () => {
        const updated = updatePost('fake-id', { caption: 'Fail' });
        expect(updated).toBeNull();
    });

    it('should delete post', () => {
        const deleted = deletePost(postId);
        expect(deleted).toBe(true);
        const post = getPostById(postId);
        expect(post).toBeUndefined();
    });

    it('should return false when deleting non-existent post', () => {
        const deleted = deletePost('fake-id');
        expect(deleted).toBe(false);
    });
});
