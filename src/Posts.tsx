import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import PostModel from "./model/PostModel";
import { useEffect, useState } from "react";
import { Page, Post } from "./interface";
import { Link } from "react-router-dom";
import { City, District } from "./utils/ProvinceUtil";
import * as PostStatus from './constant/PostStatus';
import { AreYouSurePopup } from "./popup";
import AlertUtils from "./utils/AlertUtils";

function Posts() {
  const [postPage, setPostPage] = useState<Page<Post>>()
  const [selectedId, setSelectedId] = useState<number>()
  const [isShowApprovedPopup, setIsShowApprovedPopup] = useState(false)
  const [isShowRemovedPopup, setIsShowRemovedPopup] = useState(false)


  const fetchPostPage = () => {
    PostModel.list()
      .then(resp => {
        if (resp.error == 0) {
          setPostPage(resp.data);
        }
      })
  }

  const updateStatus = (status: number) => {
    PostModel.updateStatus(selectedId, status)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
          fetchPostPage()
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    fetchPostPage()
  }, [])

  return (
    <Layout>
      {
        <>
          <AreYouSurePopup open={isShowApprovedPopup} onCloseModal={() => {
            setIsShowApprovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(PostStatus.APPROVED)
              setIsShowApprovedPopup(false)
            }} />

          <AreYouSurePopup open={isShowRemovedPopup} onCloseModal={() => {
            setIsShowRemovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(PostStatus.REMOVED)
              setIsShowRemovedPopup(false)
            }} />
        </>
      }
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
                  <div className="cart-btn-bar">
                    <Link to={"/post/create"} className="btn btn-primary mr-1">Thêm bài viết</Link>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>City</th>
                      <th>District</th>
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
                          <td>{post.cityIds ? post.cityIds.map((l: number) => City.getName(l)).join(", ") : 'Tất cả'}</td>
                          <td>{post.districtIds ? post.districtIds.map((l: number) => District.getName(l)).join(", ") : 'Tất cả'}</td>
                          <td>{post.timeStart && new Date(post.timeStart).toLocaleDateString('vi')} - {post.timeEnd && new Date(post.timeEnd).toLocaleDateString('vi')}</td>
                          <td>{post.promotionId && <Link to={`/promotion/detail/${post.promotionId}`}> <span style={{ cursor: 'pointer' }} className="badge badge-info">#khuyến_mãi_{post.promotionId}</span></Link>}</td>
                          <td><span className="badge badge-info" style={{backgroundColor: PostStatus.findColor(post.status)}}>{PostStatus.findName(post.status)}</span></td>
                          <td className="table-action">
                            <Link to={`/post/detail/${post.id}`}><i style={{ fontSize: '15px' }}
                              className="align-middle fas fa-fw fa-pen" /></Link>
                            {post.status == PostStatus.INIT &&
                              <>
                                <i onClick={() => {
                                  setSelectedId(post.id)
                                  setIsShowApprovedPopup(true)
                                }} style={{ cursor: 'pointer', margin: '0 16px' }} className="ion ion-ios-globe mr-2"></i>
                                <i onClick={() => {
                                  setSelectedId(post.id)
                                  setIsShowRemovedPopup(true)
                                }} style={{ cursor: 'pointer', margin: '0 8px' }} className="align-middle fas fa-fw fa-trash"></i>
                              </>
                            }
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
