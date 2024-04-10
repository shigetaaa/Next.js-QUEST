"use client";

import Head from 'next/head'
import Image from "next/image";
import "./globals.css";
import { Page } from '../ui/articles.jsx';


export default function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Conduit</title>
            </Head>
            <main>
                {/* ヘッダー */}
                <div className="home-banner">
                    <h1>conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>

                {/* メインコンテンツ */}
                <div className="main_container">
                    <div className="grid-container">
                        <div className="left-column">
                            <div>
                                <ul>
                                    <li >
                                        <a href="#">Global Feed</a>
                                    </li>
                                </ul>
                            </div>
                            {/* ブログ一覧表示 */}
                            <ul className="blog_wrapper">
                                <a href="#" className="blog_list_link">
                                    <div className="blog_list_container">

                                        <li>
                                            <Page />
                                        </li>
                                    </div>
                                </a>
                            </ul>
                        </div>  {/* leftカラム終了 */}


                        <div className="right-column">
                            <div className="col-md-3">
                                <div className="sidebar">
                                    <div className="tag-list">
                                        <p>Popular Tags</p>
                                        <div className="tag_container">
                                            <a href="" className="tag">programming</a>
                                            <a href="" className="tag">javascript</a>
                                            <a href="" className="tag">emberjs</  a>
                                            <a href="" className="tag">angularjs</  a>
                                            <a href="" className="tag">react</a>
                                            <a href="" className="tag">mean</a>
                                            <a href="" className="tag">node</a>
                                            <a href="" className="tag">rails</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main >
        </>
    );
}
