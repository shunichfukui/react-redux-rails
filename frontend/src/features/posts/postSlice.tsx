import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPosts, createPost, destroyPost } from "./postAPI";

export enum Statuses {
    Initial = "not feched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface PostFormData {
    post: {
        id?: string;
        title?: string;
        body?: string;
    }
}

export interface PostUpdateData {
    post_id: number;
    post: PostState;
}

export interface PostDeleteData {
    post: {
        post_id: number;
    }
}

export interface PostState {
    id?: number,
    title?: string;
    body?: string,
    created_at?: any,
    updated_at?: any,
}

export interface PostsState {
    posts: PostState[];
    status: string;
}

const initialState: PostsState = {
    posts: [
        {
            id: 1,
            title: "",
            body: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial
}

// 全投稿データの取得
export const fetchPostsAsync = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchPosts();
            return response;
        } catch (error) {
            return rejectWithValue('データ取得に失敗しました');
        }
    }
)

// 投稿の作成
export const createPostAsync = createAsyncThunk(
    'posts/createPost',
    async (payload: PostFormData) => {
        try {
            const response = await createPost(payload);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

// 投稿の削除
export const destroyPostAsync = createAsyncThunk(
    'posts/destroyPost',
    async (payload: PostDeleteData) => {
        try {
            const response = await destroyPost(payload);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const postSlice = createSlice({
    name: "posts",
    initialState,
    /**
     * Synchoronous actions
    */
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(fetchPostsAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** FIXME:リファクタ必要 作成処理 */
            .addCase(createPostAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts.push(action.payload);
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(createPostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            /** FIXME:リファクタ必要 削除処理 */
            .addCase(destroyPostAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(destroyPostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(destroyPostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
    }
});

export const {  } = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;