import { useState, useEffect } from "react";
import supabase from "./supabase";

import "./style.css";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: '40px' }}>{count}</span>
      <button className='btn btn-large' onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}


function PostApp() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getPosts() {
        setIsLoading(true);

        let query = supabase.from("posts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: posts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setPosts(posts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getPosts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}  />

      {showForm ? (
        <NewPostForm setPosts={setPosts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <PostList posts={posts} setPosts={setPosts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header1">
      <div className="logo">
        
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a Post"}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: "Prayer", color: "#3b82f6" },
  { name: "evangelism", color: "#16a34a" },
  { name: "sunday-school", color: "#ef4444" },
  { name: "ushering", color: "#eab308" },
  { name: "technical", color: "#db2777" },
  { name: "sanitation", color: "#14b8a6" },
  { name: "music", color: "#f97316" },
  { name: "in-his-beauty", color: "#8b5cf6" },
];

function validateName(x) {
  if (/^[A-Za-z\s]+$/.test(x)) return true;
  else return false;
}

function NewPostForm({ setPosts, setShowForm }) {
  const [text, setText] = useState("");
  // Fixed in a video text overlay
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //1. Prevent browser reload
    e.preventDefault();
    console.log(text, name, category);

    // 2. Check if data is valid, if so, create a new fact
    if (text && validateName(name) && category && textLength <= 200) {
      //3. Create a new fact object
      // const newPost = {
      //   id: Math.round(Math.random() * 1000000),
      //   text,
      //   name,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      //3. Upload posts to Supabase and recieve posts object
      setIsUploading(true);
      const { data: newPost, error } = await supabase
        .from("posts")
        .insert([{ text, name, category }])
        .select();
      setIsUploading(false);

      //4. Add the new fact to the UI: add the fact to state
      if (!error) setPosts((posts) => [newPost[0], ...posts]);

      //5. Reset input fields
      setText("");
      setName("");
      setCategory("");

      //6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a post with us..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Please Share your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory("all")}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function PostList({ posts, setPosts }) {
  if (posts.length === 0)
    return (
      <p className="message">
        {" "}
        No Post for the category yet! Create the first one
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} setPost={setPosts} />
        ))}
      </ul>
    </section>
  );
}

function Post({ post, setPosts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
  post.votesInteresting + post.votesMindblowing < post.votesFalse;

  async function handleVote(columnName) {
    const { data: updatedPost, error } = await supabase
      .from("posts")
      .update({ [columnName]: post[columnName] + 1 })
      .eq("id", post.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setPosts((posts) =>
        posts.map((p) => (p.id === post.id ? updatedPost[0] : p))
      );
  }

  return (
    <li className="fact">
      <p>
      {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
        {post.text}
        <span className="source">({post.name})</span>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === post.category)
            
        }}
      >
        {post.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {post.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {post.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {post.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default PostApp;
