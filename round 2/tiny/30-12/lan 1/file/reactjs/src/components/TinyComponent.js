import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react'

var arrImg = []
class TinyComponent extends Component {
    state = {
        content: '',
        id: '',
    }
    componentDidUpdate() {
        if (this.props.id) {
            this.setState({ content: this.props.content, id: this.props.id })
        }
    }
    handleOnclick(action) {
        var form = new FormData()
        console.log("conten", this.state.content);
        form.append('content', this.state.content)
        for (let i = 0; i < arrImg.length; i++) {
                form.append('arrImg', arrImg[i])
        }

        // for (let i = 0; i < arrImg.length; i++) {
        //     if (arrImg[i].name) {
        //         form.append('arrImg', arrImg[i])
        //     }
        // }
        switch (action) {
            case 'add':
                if (this.state.content === '') {
                    alert('nhap thu muon add')
                } else {
                    this.props.addItemRequest({ form: form })
                    arrImg = []
                    this.setState({ content: '' })
                }
                break;
            case 'put':
                this.props.putItemRequest({ id: this.state.id, form: form })
                arrImg = []
                this.setState({ content: '', id: '' })
                break;
            default:
                break;
        }
    }
    render() {
        
        return (
            
            <div>
                <Editor
                    apiKey={'tecpe00a4cesehrsuucg2ieiyi037nl0o0qp23ut727x1gyv'}
                    value={this.state.content}
                    onEditorChange={(content) => this.setState({ content: content })}

                    init={{

                        height: 500,
                        width: '50%',
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount image'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat |  image help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                        images_upload_handler: async function (blobInfo, success, failure) {

                            // arrImg.push(blobInfo.blob())
                            // console.log('bloc', blobInfo.blob());
                            // var newurl = URL.createObjectURL(blobInfo.blob())
                            // blob:http://localhost:3000/3341408d-be08-4f6a-806d-20aa1226dce3
                            // var newurl = `blob:http://localhost:3000/${blobInfo.blob().lastModified + blobInfo.blob().name}`
                            var response;
                            var url = "http://localhost:3002/img"
                            var form = new FormData()
                            form.append("img", blobInfo.blob())
                            try {
                                response = await fetch(url, {
                                    method: 'POST',
                                    body: form
                                })
                                const res = await response.json()
                                success(res.url)
                                let nameImg = res.nameImg
                                arrImg.push(nameImg)
                            } catch (error) {
                                failure('Invalid JSON: ' + response)
                                return
                            }
                            // try {
                            //     // for (let i = 0; i < arrImg.length; i++) {
                            //     //     
                            //     // }

                            //     //console.log('file', blobInfo.blob()) // file
                            //     success(newurl)

                            // } catch (error) {
                            //     failure('Invalid JSON: ')
                            //     return
                            // }
                        }
                    }}
                />
                <div>

                    <button style={{ display: this.state.id ? 'none' : 'inline-block' }} onClick={() => {
                        this.handleOnclick('add')
                        //   arrImg.map((file,i)=>{
                        //      return(
                        //          <span key={i}>{file.name ? arrImgNew.push(file):null
                        //          }</span>
                        //      )
                        //  })
                        //  console.log("arrrr2",arrImgNew);
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnclick('put')
                    }}>update</button>
                </div>
            </div>
        );
    }
}
export default TinyComponent;