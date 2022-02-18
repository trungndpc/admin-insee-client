import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import Select from 'react-select'
import INSEEEditor from "./component/INSEEEditor";
import { useEffect, useRef, useState } from "react";
import { Post } from "./interface";
import { City, District } from '../src/utils/ProvinceUtil'
import UploadFileUtil from "./utils/UploadFileUtil";
import PostModel from "./model/PostModel";
import PromotionModel from "./model/PromotionModel";
import { useNavigate } from 'react-router-dom';
import AlertUtils from "./utils/AlertUtils";

const locationOptions = City.getOptions()
function CreatePost() {
  const navigate = useNavigate()
  const inputImgRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<any>(null);
  const [previewImg, setPreviewImg] = useState(null as any);
  const [file, setFile] = useState(null as any);
  const [postForm, setPostForm] = useState<Post>({} as Post)
  const [errorMsg, setErrorMsg] = useState<string>();
  const [lstPromotion, setLstPromotion] = useState([] as any)


  const fetchPromotion = () => {
    PromotionModel.listPromotionForPost()
      .then(resp => {
        setLstPromotion(resp.data)
      })
  }

  const submit = async () => {
    let content = editorRef.current.getValue()
    if (!file || !postForm.title || !postForm.summary || !content) {
      setErrorMsg('Vui lòng nhập đủ thông tin')
      return;
    }
    let resp = await UploadFileUtil.uploadImg(file)
    if (resp.error != 200) {
      setErrorMsg('Upload file thất bại')
      return;
    }

    PostModel.create({ ...postForm, cover: resp.data, content: content })
      .then(resp => {
        if (resp.error == 0) {
          navigate("/post")
          AlertUtils.showSuccess('Thành công')
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    fetchPromotion()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Post Form
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
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => { setPostForm({ ...postForm, title: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Promotion</label>
                      <div className="col-sm-10">
                        <select onChange={(e: React.FormEvent<HTMLSelectElement>) => { setPostForm({ ...postForm, promotionId: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
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
                      <label className="col-form-label col-sm-2 text-sm-right">Citys</label>
                      <div className="form-group col-sm-4">
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setPostForm({ ...postForm, cityIds: list })
                          }}
                          options={locationOptions}
                        />
                      </div>
                      <label className="col-form-label col-sm-2 text-sm-right">Districts</label>
                      <div className="form-group col-sm-4">
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setPostForm({ ...postForm, districtIds: list })
                          }}
                          options={(postForm && postForm.cityIds && postForm.cityIds.length > 0) ? District.getOption(postForm.cityIds) : []}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Time Start</label>
                      <div className="form-group col-md-4">
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setPostForm({ ...postForm, timeStart: Number(e.currentTarget.valueAsDate?.getTime()) })
                        }} type="date" className="form-control" />
                      </div>
                      <label className="col-form-label col-sm-2 text-sm-right">Time End</label>
                      <div className="form-group col-md-4">
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setPostForm({ ...postForm, timeEnd: Number(e.currentTarget.valueAsDate?.getTime()) })
                        }} type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-sm-2 text-sm-right">Summary</label>
                      <div className="col-sm-10">
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => { setPostForm({ ...postForm, summary: e.currentTarget.value }) }} type="text" className="form-control" />
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
                        <div onClick={() => { submit() }} className="btn btn-primary">Submit</div>
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

export default CreatePost;
