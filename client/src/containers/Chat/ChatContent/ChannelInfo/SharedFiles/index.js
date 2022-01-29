import React from 'react';
import { Tooltip } from '@mui/material';
import { KeyboardArrowRight, Download, InsertDriveFile } from '@mui/icons-material';
import {
  SharedFilesList,
  SharedFilesItem,
  SharedFilesIcon,
  SharedFilesDetails,
  SharedFilesName,
  AccordionCustom,
  AccordionCustomSummary,
  AccordionCustomDetails,
} from '../styles';

import { formatFromByte, formatToDate } from '../../../../../utils/format';
import { fileIconConst } from '../../../../../constants/icons';
import { enumTypes } from '../../../../../validation/checkFile.validation';

const SharedFiles = ({ detailChannel }) => {
  return (
    <div className="shared-files">
      <AccordionCustom className="accordion-custom">
        <AccordionCustomSummary className="accordion-custom__summary" expandIcon={<KeyboardArrowRight />}>
          Shared Files
        </AccordionCustomSummary>
        <AccordionCustomDetails className="accordion-custom__details">
          <SharedFilesList className="shared-files__list">
            {detailChannel.sharedFiles.map((item, i) => (
              <SharedFilesItem className="shared-files__item" key={i}>
                <SharedFilesIcon className="shared-files__icon">
                  <div className="icon-img-container">
                    {!enumTypes.toLowerCase().includes(item.filename.split('.').pop()) ? (
                      <InsertDriveFile />
                    ) : (
                      <img src={fileIconConst[item.filename.split('.').pop()]} alt="" />
                    )}
                  </div>
                </SharedFilesIcon>
                <SharedFilesDetails className="shared-files__details">
                  <Tooltip title={item.filename}>
                    <SharedFilesName className="shared-files__name">{item.filename}</SharedFilesName>
                  </Tooltip>
                  <div className="date-size-wrapper">
                    <div className="shared-files__date">{formatToDate(item.created_at)}</div>
                    <div className="dot"></div>
                    <div className="shared-files__size">{formatFromByte(item.size)}</div>
                  </div>
                </SharedFilesDetails>
                <a className="download-icon" href={item.url} target="_blank" rel="noreferrer">
                  <Download />
                </a>
              </SharedFilesItem>
            ))}
          </SharedFilesList>
        </AccordionCustomDetails>
      </AccordionCustom>
    </div>
  );
};

export default SharedFiles;
