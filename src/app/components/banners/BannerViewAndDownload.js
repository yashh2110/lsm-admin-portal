import React, {useState} from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import Dialog from '@mui/material/Dialog';
function BannerViewAndDownload({rowData}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const download = e => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: 'GET',
      headers: {},
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            rowData.name.split(' ').join('') + '.jpg',
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="bannerTableImage">
      <img src={rowData.imagePath} alt="offer" width="120px" />
      <div className="bannerActions">
        <div className="bannerActionIcon">
          <OpenInNewOutlinedIcon onClick={() => setOpen(true)} />
        </div>
        <a
          href={rowData.imagePath}
          download
          target="_blank"
          className="bannerActionIcon"
          onClick={download}
          rel="noreferrer">
          <FileDownloadOutlinedIcon />
        </a>
      </div>
      <Dialog onClose={handleClose} open={open} maxWidth="lg">
        <img src={rowData.imagePath} alt="banner" />
      </Dialog>
    </div>
  );
}

export default BannerViewAndDownload;
