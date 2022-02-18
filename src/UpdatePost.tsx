import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import INSEEEditor from "./component/INSEEEditor";
import { useEffect, useRef, useState } from "react";
import { Post } from "./interface";
import UploadFileUtil from "./utils/UploadFileUtil";
import PostModel from "./model/PostModel";
import Select from 'react-select'
import { useParams } from "react-router-dom";
import { City, District } from '../src/utils/ProvinceUtil'
import DateTimeUtil from "./utils/DateTimeUtil";
import PromotionModel from "./model/PromotionModel";
import AlertUtils from "./utils/AlertUtils";

const locationOptions = City.getOptions()
function UpdatePost() {
  let { id } = useParams();
  const inputImgRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<any>(null);
  const [previewImg, setPreviewImg] = useState(null as any);
  const [file, setFile] = useState(null as any);
  const [post, setPost] = useState<Post>({} as Post)
  const [errorMsg, setErrorMsg] = useState<string>();
  const [lstPromotion, setLstPromotion] = useState([] as any)

  const fetchPromotion = () => {
    PromotionModel.listPromotionForPost()
      .then(resp => {
        setLstPromotion(resp.data)
      })
  }

  const fetchPost = () => {
    PostModel.get(id)
      .then(resp => {
        let post: Post = resp.data;
        setPost(post)
        setPreviewImg(post.cover)
        editorRef.current.setValue(post.content)
      })
  }

  const submit = async () => {
    let content = editorRef.current.getValue()
    if (!content) {
      setErrorMsg('Vui lòng nhập content')
      return;
    }
    if (!post.title) {
      setErrorMsg('Vui lòng nhập content')
      return;
    }

    if (!post.summary) {
      setErrorMsg('Vui lòng nhập summary')
      return;
    }

    let urlCover;
    if (file) {
      let resp = await UploadFileUtil.uploadImg(file)
      if (resp.error != 200) {
        setErrorMsg('Upload file thất bại')
        return;
      }
      urlCover = resp.data;
    }

    if (!post.cover && !urlCover) {
      setErrorMsg('Vui lòng chọn cover')
      return;
    }

    let postForm = { ...post, content: content }
    if (urlCover) {
      postForm.cover = urlCover;
    }

    PostModel.create(postForm)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    fetchPromotion()
    fetchPost()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Post Detail
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right"></label>
                      <div className="col-sm-10">
                        <div className="create-post-select-img-container">
                          <input ref={inputImgRef} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPreviewImg(URL.createObjectURL(event.target.files![0]))
                            setFile(event.target.files![0])
                          }} type="file" style={{ display: 'none' }} />
                          {previewImg && <img style={{ maxHeight: '200px' }} src={previewImg} />}
                          <i onClick={() => {
                            inputImgRef.current?.click()
                          }} className="align-middle mr-2 far fa-fw fa-image"></i>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Title</label>
                      <div className="col-sm-10">
                        <input value={post.title} onChange={(e: React.FormEvent<HTMLInputElement>) => { setPost({ ...post, title: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Promotion</label>
                      <div className="col-sm-10">
                        <select value={post.promotionId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setPost({ ...post, promotionId: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
                          <option selected>Choose...</option>
                          {lstPromotion && lstPromotion.map((a: any) => {
                            return (
                              <option value={a.id}>{a.title}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">City</label>
                      <div className="col-sm-4">
                        <Select
                          isClearable={true}
                          isMulti={true}
                          value={post.cityIds && post.cityIds.map((id: number) => {
                            return {
                              value: id,
                              label: City.getName(id)
                            }
                          })}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setPost({ ...post, cityIds: list })
                          }}
                          options={locationOptions}
                        />
                      </div>
                      <label className="col-form-label col-sm-2 text-sm-right">District</label>
                      <div className="col-sm-4">
                        <Select
                          isClearable={true}
                          isMulti={true}
                          value={post.districtIds && post.districtIds.map((id: number) => {
                            return {
                              value: id,
                              label: District.getName(id)
                            }
                          })}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setPost({ ...post, districtIds: list })
                          }}
                          options={(post && post.cityIds && post.cityIds.length > 0) ? District.getOption(post.cityIds) : []}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Time Start</label>
                      <div className="form-group col-md-4">
                        <input value={post.timeStart ? new Date(post.timeStart).toISOString().slice(0, 10) : ''}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            let time = new Date(e.currentTarget.value).getTime();
                            setPost({ ...post, timeStart: time })
                          }} type="date" className="form-control" />
                      </div>
                      <label className="col-form-label col-sm-2 text-sm-right">Time End</label>
                      <div className="form-group col-md-4">
                        <input value={post.timeEnd ? new Date(post.timeEnd).toISOString().slice(0, 10) : ''}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            let time = new Date(e.currentTarget.value).getTime();
                            setPost({ ...post, timeEnd: time })
                          }} type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Summary</label>
                      <div className="col-sm-10">
                        <input value={post.summary} onChange={(e: React.FormEvent<HTMLInputElement>) => { setPost({ ...post, summary: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Content</label>
                      <div className="col-sm-10">
                        <INSEEEditor myRef={editorRef} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-10 ml-sm-auto">
                        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                        <div onClick={() => { submit() }} className="btn btn-primary">Save</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default UpdatePost;
