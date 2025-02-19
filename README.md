# 🚀 Next.js CRUD Application (JSONPlaceholder API)

This project is a full-featured CRUD (Create, Read, Update, Delete) application built with Next.js. It uses the JSONPlaceholder API as a mock backend and leverages modern libraries such as React Query for data fetching, React Hook Form for form management, Zod for schema validation, and TailwindCSS/DaisyUI for styling.

> **Note:** JSONPlaceholder is a mock API. Although it returns success for create, update, and delete operations, the data is not truly persisted on the server. This project simulates persistence by manually updating the client-side cache.

---

## 📌 Features

- **Create Posts:**  
  Add new posts with client-side cache updates and Zod validation.
  
- **Read Posts:**  
  Fetch and display posts (limited to the first 10) using React Query.
  
- **Update Posts:**  
  Edit existing posts using a persistent update pattern that waits for the API response before updating the UI.
  
- **Delete Posts:**  
  Remove posts using an optimistic update that immediately removes the post from the UI without a refetch.
  
- **Validation:**  
  Forms are validated using Zod (integrated via `@hookform/resolvers/zod`), ensuring that required fields (title and body) are provided.
  
- **Styling:**  
  The app is styled using TailwindCSS and DaisyUI (with a dark theme), ensuring a modern and responsive design.

---

## 📂 Directory Structure

Directory Structure:

└── ./
    └── crud-nextjs-app
        ├── src
        │   └── app
        │       ├── api
        │       │   └── posts.js
        │       ├── components
        │       │   ├── EditPostForm.js
        │       │   ├── PostForm.js
        │       │   └── PostList.js
        │       ├── styles
        │       │   └── globals.css
        │       ├── _app.js
        │       ├── layout.js
        │       └── page.js
        └── tailwind.config.js

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

### Clone the Repository

git clone https://github.com/yourusername/nextjs-crud-app.git
cd crud-nextjs-app

//Install Dependencies

npm install

//Start the Development Server

npm run dev

//Open http://localhost:3000 in your browser to view the app.


🛠️ API Integration (JSONPlaceholder)

This application uses the JSONPlaceholder API for simulating CRUD operations:

    GET Posts:
    The getPosts function fetches posts from https://jsonplaceholder.typicode.com/posts and returns only the first 10 posts.

    POST Create Post:
    New posts are created by sending a POST request. Instead of invalidating the query (which refetches stale data), the cache is updated manually to include only the user-created post.

    PUT Update Post:
    Updates are handled using a persistent update pattern: once the API returns success, the local cache is updated to reflect the changes.

    DELETE Post:
    Deletions use an optimistic update that immediately removes the post from the cache, preventing stale data from being refetched.

    Important: Because JSONPlaceholder does not persist changes, all data modifications are simulated on the client side using React Query's caching.


🚧 Challenges Faced & Resolutions
React Query Provider Configuration

    Issue:
    Encountered the error “No QueryClient set, use QueryClientProvider to set one.”
    Resolution:
    Ensured that all components are wrapped with <QueryClientProvider> in layout.js (and _app.js for the App Router) so that React Query is properly initialized.

React Query v5 Migration

    Issue:
    Errors like TypeError: this[#client].defaultMutationOptions is not a function and “Bad argument type” were encountered when using useQuery and useMutation.
    Resolution:
    Updated the code to use the new object-based syntax:

    useQuery({ queryKey: ["posts"], queryFn: getPosts });
    useMutation({ mutationFn: deletePost, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }) });

    This aligned our implementation with the latest React Query v5 requirements.

Module Import Issues

    Issue:
    Encountered a ReferenceError: getPosts is not defined due to incorrect module import paths.
    Resolution:
    Adjusted import statements to ensure that all API functions are correctly imported in each component.

Create Post Auto-Refresh Issue

    Issue:
    Creating a post would trigger a full page refresh and, if all 10 posts were deleted, the new post was accompanied by the full default set of posts.
    Resolution:
        Modified getPosts to return only 10 posts.
        Updated the create mutation to manually update the cache instead of invalidating the query, ensuring that only the user’s new post appears.

Deletion Functionality

    Issue:
    Deleted posts would disappear momentarily but then reappear upon refetch.
    Resolution:
    Implemented an optimistic update in the deletion mutation that cancels outgoing queries, updates the cache immediately to remove the deleted post, and avoids refetching stale data.

Update (Edit) Functionality

    Issue:
    Updates were failing with a 500 error because JSON Server was throwing a "Cannot read properties of undefined (reading 'id')" error. Initially, the update request did not include the id in its payload. Later, when creating posts, a unique id was generated (e.g., "101- <timestamp>") to prevent duplicate keys. However, this non-numeric ID caused the update request to fail because JSONPlaceholder (or JSON Server) expects a numeric id.
    Resolution:
    Modified the updatePost API function to check if the id is a locally generated string (containing a hyphen). If so, it simulates a successful update locally by returning the updated post without making an API call. Otherwise, it includes the id in the request body:


Duplicate Key Issue Due to JSONPlaceholder's ID Behavior

    Issue:
    JSONPlaceholder always returns the same id (typically 101) for every new post. As a result, when multiple posts are created, duplicate keys appear, leading to React warnings and rendering issues.
    Resolution:
    In the create mutation’s onSuccess handler, a unique id is generated (for example, by appending a timestamp) to the post if the returned id is 101. This ensures that every new post in the cache has a unique key.


🚀 Deployment (Vercel)

    Push Your Code to GitHub:

    git add .
    git commit -m "Final CRUD implementation with persistent updates, optimistic deletions, and Zod validation"
    git push origin main

    Deploy on Vercel:
        Go to Vercel and click New Project.
        Import your GitHub repository.
        Click Deploy and wait for the build to finish.

🔗 Live Demo: https://your-vercel-link.com

🙌 Acknowledgments

    JSONPlaceholder for providing a free mock REST API.
    Next.js for its modern web development framework.
    TailwindCSS & DaisyUI for a clean, responsive UI.
    React Query & React Hook Form for efficient data fetching and form management.
    Zod for robust schema-based validation.
