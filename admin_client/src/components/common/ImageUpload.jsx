import React from 'react';
import Dropzone from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    const thumbs = this.state.files.map(file => (
      <div style={thumb}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/*"
            onDrop={this.onDrop}
            onFileDialogCancel={this.onCancel}
          >
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }
}

export default ImageUpload;
