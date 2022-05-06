import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'
var arrNameImg = []
export default class TinyComponent extends Component {
    state = {
        content: '',
        id: ''
    }
    componentDidUpdate() {
        if (this.props.id) {
            this.setState({ content: this.props.content })
            this.setState({ id: this.props.id })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Editor
                        //editor
                        // Một tài liệu tham khảo cho người biên tập.
                        apiKey={'tecpe00a4cesehrsuucg2ieiyi037nl0o0qp23ut727x1gyv'}
                        value={this.state.content}
                        //value=Đặt và thực thi giá trị của trình chỉnh sửa. Chỉ được sử dụng cho một thành phần được kiểm soát.
                        onEditorChange={(content) => this.setState({ content: content })}
                        //onEditorChange: Một trình xử lý sự kiện để phát hiện các thay đổi của trình soạn thảo. Hữu ích khi triển khai TinyMCE như một thành phần được kiểm soát.
                        init={{
                            //init :Các tùy chọn bổ sung được chuyển cho TinyMCE khi nó được khởi tạo.
                            height: 500,
                            width: '50%',
                            menubar: false,
                            plugins: [
                                //plugins: cài đặt những phần mở rộng cho HTML editor:
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount image'
                            ],
                            toolbar:
                                // toolbar: cài đặt các công cụ cần thiết cho việc soạn thảo như:
                                // Đinh dạng chữ: bold, italic, underline
                                // Căn lề: alignleft, aligncenter, ignjustify, alignright
                                // Định dạng font: formatselect, fontselect, fontsizeselect
                                'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat |  image help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            // content_style
                            // Tùy chọn này cho phép các kiểu CSS tùy chỉnh được đặt thành một chuỗi. Các kiểu được đưa vào headtrang chứa vùng có thể chỉnh sửa.
                            // Áp dụng một kiểu CSS bằng content_style
                            images_upload_handler: async function (blobInfo, success, failure, progress) {
                                // Hàm xử lý tải anh lên có bốn đối số:blobInfo, success, failure,progress
                                // blobInfo
                                // A success callback
                                //callback - một cuộc gọi lại để gọi, khi bạn đã nắm giữ tệp;
                                // nó mong đợi giá trị mới cho trường làm đối số đầu tiên và tùy chọn thông tin meta cho các trường khác trong hộp thoại là đối số thứ hai

                                // A failure callback gọi lại nhận thông báo lỗi và một đối tượng tùy chọn chứa:
                                // remove - Removes  Xóa hình ảnh khỏi tài liệu, defaults to false
                                // progress callback gọi lại có giá trị từ 1 đến 100
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
                    <button style={{ display: this.state.id ? 'none' : 'inline-block' }} onClick={() => {
                        if (this.state.content === '') {
                            alert('dien thu muon add')
                        } else {
                            this.props.addItemRequest({ content: this.state.content, arrNameImg: arrNameImg })
                            this.setState({ content: '' })
                            arrNameImg = []
                        }
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block' : 'none' }} onClick={() => {
                        if (this.state.content === '') {
                            alert('dien thu muon update')
                        } else {
                            this.props.updateItemRequest({ id: this.state.id, content: this.state.content, arrNameImg: arrNameImg })
                            this.setState({ content: '' })
                            this.setState({ id: '' })
                            arrNameImg = []
                        }
                    }}>update</button>
                </div>
            </div>
        )
    }
}
