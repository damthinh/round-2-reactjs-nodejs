import React, { Component } from 'react'

import { Editor } from '@tinymce/tinymce-react'
var arrNameImg=[]
export default class Tinycomponent extends Component {
    state ={
        content :'',
        id:''
    }
    componentDidUpdate(){
        if (this.props.id) {
            this.setState({content:this.props.content})
            this.setState({id:this.props.id})
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
                                arrNameImg.push(nameImg)
                            } catch (error) {
                                failure('Invalid JSON: ' + response)
                                return
                            }
                        }
                    }}
                />
                <div>
                    <button style={{display:this.state.id ? "none":'inline-block'}} onClick={()=>{
                        this.props.addItemRequest({content: this.state.content,arrNameImg :arrNameImg})
                        this.setState({content:''})
                        arrNameImg=[]
                    }}>add</button>
                    <button style={{display:this.state.id ? 'inline-block':'none'}} onClick={()=>{
                        this.props.putItemRequest({id: this.state.id,content: this.state.content,arrNameImg :arrNameImg})
                        this.setState({id:'',content:''})
                        arrNameImg=[]
                    }}>update</button>
                </div>
            </div>
        )
    }
}
