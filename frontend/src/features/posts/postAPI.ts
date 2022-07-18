import { PostsState,  } from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
    return fetch(`${API_URL}/posts.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Methods': 'PUT, DELETE, PATCH, GET'
        },
    }).then((response) => response.json())
    .catch((error) => {
        console.log(error);
        return {} as PostsState;
    })
}