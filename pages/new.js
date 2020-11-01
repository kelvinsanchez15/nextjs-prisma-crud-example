import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";

export default function newPost() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { email, title, content };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>New Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form onSubmit={submitData}>
          <h1>New Post</h1>
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
            value={email}
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !title || !email}
            type="submit"
            value="Create"
          />
        </form>
      </div>
    </>
  );
}
