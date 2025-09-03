export interface Bookmark {
    id: number;
    url: string;
    title: string;
}

let bookmarks: Bookmark[] = [];
let nextId = 1;

export class BookmarkModel {
    static create(url: string, title: string): Bookmark | null {
        if (bookmarks.find(b => b.url === url)) {
            return null; // Duplicate not allowed
        }
        const newBookmark: Bookmark = { id: nextId++, url, title };
        bookmarks.push(newBookmark);
        return newBookmark;
    }

    static findById(id: number): Bookmark | undefined {
        return bookmarks.find(b => b.id === id);
    }

    static findAll(): Bookmark[] {
        return bookmarks;
    }

    static update(id: number, url?: string, title?: string): Bookmark | null {
        const bookmark = bookmarks.find(b => b.id === id);
        if (!bookmark) return null;

        if (url && bookmarks.some(b => b.url === url && b.id !== id)) {
            return null; // Prevent duplicate
        }

        if (url) bookmark.url = url;
        if (title) bookmark.title = title;
        return bookmark;
    }

    static delete(id: number): Bookmark | null {
        const index = bookmarks.findIndex(b => b.id === id);
        if (index === -1) return null;

        const deleted = bookmarks[index];
        bookmarks.splice(index, 1);
        return deleted;
    }
}
