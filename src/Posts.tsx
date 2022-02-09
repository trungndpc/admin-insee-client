import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import PostModel from "./model/PostModel";
import { useEffect, useState } from "react";
import { Page, Post } from "./interface";
import { Link } from "react-router-dom";
import { City } from "./utils/ProvinceUtil";


function Posts() {
  const [postPage, setPostPage] = useState<Page<Post>>()

  const fetchPostPage = () => {
    PostModel.list()
      .then(resp => {
        if (resp.error == 0) {
          setPostPage(resp.data);
        }
      })
  }

  useEffect(() => {
    fetchPostPage()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Posts
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Danh sách các bài viết</h5>
                  <div className="cart-btn-bar">
                    <Link to={"/post/create"} className="btn btn-primary mr-1">Thêm bài viết mới</Link>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Locations</th>
                      <th>Duration</th>
                      <th>Promotion</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postPage && postPage.list && postPage.list.map(post => {
                      return (
                        <tr>
                          <td>
                            <img src={post.cover} className="mr-2 post-cover-posts" />
                          </td>
                          <td>{post.title}</td>
                          <td>{post.locations ? post.locations.map((l: number) => City.getName(l)).join(", ") : 'Tất cả'}</td>
                          <td>{post.timeStart && new Date(post.timeStart).toLocaleDateString('vi')} - {post.timeEnd && new Date(post.timeEnd).toLocaleDateString('vi')}</td>
                          <td>{post.promotionId && <Link to={`/promotion/detail/${post.promotionId}`}> <span style={{ cursor: 'pointer' }} className="badge badge-info">#khuyến_mãi_{post.promotionId}</span></Link>}</td>
                          <td><span className="badge badge-info">Khởi tạo</span></td>
                          <td className="table-action">
                            <Link to={`/post/detail/${post.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default Posts;
