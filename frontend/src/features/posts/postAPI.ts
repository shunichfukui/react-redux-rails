import { PostDeleteData, PostFormData, PostsState } from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
    return fetch(`${API_URL}/posts.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Methods': 'GET'
        },
    }).then((response) => response.json())
    .catch((error) => {
        console.log(error);
        return {} as PostsState;
    });
}

export async function createPost(payload: PostFormData) {
    const post = payload.post;

    return fetch(`${API_URL}/posts.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({
            post: post
        })
    }).then((response) => response.json())
    .catch((error) => {
        console.log(error);
        return {} as PostsState;
    });
}

export async function destroyPost(payload: PostDeleteData) {
    const post = payload.post;

    return fetch(`${API_URL}/posts/${post.post_id}.json`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Methods': 'DELETE'
        },
        body: JSON.stringify({
            post,
        }),
    }).then((response) => response.json())
    .catch((error) => {
        console.log(error);
        return {} as PostsState;
    });
}